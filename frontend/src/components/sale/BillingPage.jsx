import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const BillingPage = () => {
  const { billId } = useParams();
  const [billDetails, setBillDetails] = useState(null);
  const [itemNames, setItemNames] = useState({});
  const token = localStorage.getItem('authToken');
  const fetchBillDetails = async () => {
    try {
        
      const response = await api.fetchSalesByBillId(token,billId);
      setBillDetails(response);
    } catch (error) {
      console.error('Error fetching bill details:', error);
    }
  };

  const fetchItemNames = async () => {
    const itemIdsToFetch = billDetails
      .map((item) => item.item_id)
      .filter((itemId) => !itemNames[itemId]); // Fetch only if name is not already present

    const fetchPromises = itemIdsToFetch.map((itemId) =>
      api.fetchItem(token, itemId).then((itemData) => {
        setItemNames({ ...itemNames, [itemId]: itemData.item_name });
      })
    );

    await Promise.all(fetchPromises); 
  };


  useEffect(() => {
    fetchBillDetails();
  }, [billId]);

  useEffect(() => {
    if (billDetails) {
      fetchItemNames();
    }
  }, [billDetails, itemNames]); 

  // ... rest of your component to display bill details ...

  return (
    <div className='flex flex-col items-center'>
    <div className='flex flex-row justify-center my-[2%]'>
    <h1 className='text-6xl font-bold font-serif'>Bill</h1>
    </div>
    {billDetails ? (
      <div className='flex flex-col items-center w-[50%] shadow-2xl shadow-blue-600'>
        <p>Bill ID: {billDetails[0].bill_id}</p> 
        <p>Date: {new Date(billDetails[0].sell_date).toLocaleDateString()}</p>
        <p>Employee: {billDetails[0].employee_name}</p> 

        {/* Table to display items */}
        <table className='table-auto my-4'>
          <thead className='outline'>
            <tr>
              <th className='p-2'>Item Name</th>
              <th className='p-2'>Quantity</th>
              <th className='p-2'>Price per Item</th>
              <th className='p-2'>Total Price</th>
            </tr>
          </thead>
          <tbody className='outline'>
            {billDetails.map((item) => (
              <tr key={item.item_id}> 
                <td className='outline p-2'>{itemNames[item.item_id] || 'Loading...'}</td>
                <td className='outline p-2'>{item.quantity}</td>
                <td className='outline p-2'>{item.sell_price}</td>
                <td className='outline p-2'>{item.quantity * item.sell_price}</td> 
              </tr>
            ))}
          </tbody>
        </table>

        {/* Calculation of total bill amount */}
        <p className='my-4'>
          Total Amount:{' '}
          {billDetails.reduce((total, item) => total + item.quantity * item.sell_price, 0)}
        </p>
      </div>
    ) : (
      <p>Loading bill details...</p>
    )}
    {/* <div className='flex flex-col items-center'>
    <a href="/home">
        <button className='bg-purple-400 text-gray-900 font-bold text-xl hover:bg-purple-700 hover:text-white p-4 border-2 rounded-full '>Return Home</button> 
      </a>
    </div> */}
    
  </div>
  );
};

export default BillingPage;

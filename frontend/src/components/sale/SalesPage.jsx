import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const SalesPage = () => {
  const [items, setItems] = useState([]);
  const [saleQuantities, setSaleQuantities] = useState({}); // To store quantities for each item
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('authToken'); 
      const response = await api.fetchItems(token); 
      setItems(response);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleQuantityChange = (event, itemId) => {
    setSaleQuantities({
      ...saleQuantities,
      [itemId]: parseInt(event.target.value), // Ensure quantity is a number
    });
  };

  const handleSubmitSale = async () => {
    const saleItems = [];
    const token = localStorage.getItem('authToken');
    for (const itemId in saleQuantities) {
      const quantity = saleQuantities[itemId];
      if (quantity > 0) {
        saleItems.push({ item_id: itemId, quantity });
      }
    }
    if (saleItems.length === 0) {
      alert('Please select quantity for at least one item');
      return;
    }

    try {
      const response = await api.createBulkSale(token,saleItems);
      const billId = response[0].bill_id; 
      navigate(`/billing/${billId}`);
    } catch (error) {
      console.error('Error creating sale:', error);
      alert('Error creating sale. Please try again.');
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-6xl font-bold my-6 font-serif'>Make Sale</h1>
      <table className='table-auto shadow-2xl shadow-black'>
        <thead className='outline'>
          <tr>
            <th className='p-2'>Item Name</th>
            <th className='p-2'>Sell Price</th>
            <th className='p-2'>Stock</th>
            <th className='p-2'>Quantity</th>
          </tr>
        </thead>
        <tbody className='outline'>
          {items.map((item) => (
            <tr key={item.item_id}>
              <td className='p-2 outline'>{item.item_name}</td>
              <td className='p-2 outline'>{item.sell_price}</td>
              <td className='p-2 outline'>{item.stock}</td>
              <td className='p-2 outline'>
                <input
                  className='bg-gray-200'
                  type="number"
                  min="1"
                  max={item.stock}
                  onChange={(e) => handleQuantityChange(e, item.item_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='my-4 border-1 bg-yellow-300 text-gray-800 hover:bg-orange-500 hover:text-white p-2 rounded-2xl shadow-2xl' onClick={handleSubmitSale}>Confirm Sale</button>
    </div>
  );
};

export default SalesPage;

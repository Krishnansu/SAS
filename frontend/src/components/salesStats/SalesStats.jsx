import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

const SalesStats = () => {
  const [stats, setStats] = useState(null);
  const [itemName, setItemName] = useState('');
  const [xdate, setDate] = useState(new Date().toISOString());
  const [xstartDate, setStartDate] = useState(new Date().toUTCString().slice(0,10));
  const [xendDate, setEndDate] = useState(new Date().toISOString());
  const [xdateRange,setDateRange] = useState(false);
  const { state } = useLocation(); 
  const { itemId } = useParams();
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/home');
};
  useEffect(() => {
    const date = state.date; 
    const startDate = state.startDate;
    const endDate = state.endDate;
    setDate(date.toISOString().slice(0,10));
    setStartDate(startDate.toISOString().slice(0,10));
    setEndDate(endDate.toISOString().slice(0,10));
    setDateRange(state.dateRange);
    const fetchStats = async () => {
      try {
        if(state.dateRange)
        {
            const response = await api.fetchSalesStatsByDateRange(token, itemId, startDate, endDate);
            setStats(response || { totalQuantity: 0, totalPrice: 0, totalProfit: 0 });
        }
        else{
            const response = await api.fetchSalesStatsByDate(token, itemId, date);
            setStats(response || { totalQuantity: 0, totalPrice: 0, totalProfit: 0 });
        }
         
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.fetchItem(token, itemId); // Assuming you have this function
        setItemName(response.item_name);

      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  return (
    <div className='flex flex-row justify-center my-[7%]'>
      {stats ? (
        <div className='flex flex-col items-center border-2 shadow-2xl w-[30%] p-4'>
        <div className='flex flex-row justify-center my-[5%]'><h1 className='text-4xl font-bold'>Sales Statistics</h1></div>
        {xdateRange ? 
        (
            <div className='flex flex-row justify-center my-[5%]'><h1 className='text-2xl font-semibold'>from {xstartDate} - {xendDate}</h1></div>
        ) :
        (
            <div className='flex flex-row justify-center my-[5%]'><h1 className='text-2xl font-semibold'>on {xdate}</h1></div>
        )}
          <p className='p-2 outline m-2 w-[50%]'>Item ID: {itemId} </p> 
          <p className='p-2 outline m-2 w-[50%]'>Item Name: {itemName} </p> 
          <p className='p-2 outline m-2 w-[50%]'>Total Quantity Sold: {stats.totalQuantity}</p>
          <p className='p-2 outline m-2 w-[50%]'>Total Price Realised: {stats.totalPrice}</p>
          <p className='p-2 outline m-2 w-[50%]'>Total Profit: {stats.totalProfit}</p>

          <div className='flex flex-row justify-center'>

                <button className='bg-purple-400 w-full text-gray-900 font-bold text-lg hover:bg-purple-700 hover:text-white p-1 m-2 border-2 rounded-2xl ' onClick={handleNavigation}>Back</button> 
            
            {/* <a href="/home">
                <button className='bg-purple-400 text-gray-900 font-bold text-lg hover:bg-purple-700 hover:text-white p-1 m-2 border-2 rounded-2xl '>Return Home</button> 
            </a> */}
    </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SalesStats; 

import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import AccessDenied from '../error/AccessDenied';

const SalesStatsInputPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [dateRange,setDateRange] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date()); // Initialize with today's date
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole'); 
    setUserRole(storedRole);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      
      try {
        const response = await api.fetchItems(token); 
        setItems(response);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const handleSubmit = async () => {
    // if (!selectedItemId || !date) {
    //   alert('Please select item and date');
    //   return; 
    // }

    try {
      // Send the request and navigate
      await api.fetchSalesStatsByDate(token, selectedItemId, date);
      navigate(`/stats/${selectedItemId}`, { state: { date: date, startDate: startDate, endDate: endDate, dateRange: dateRange} });
    } catch (error) {
      console.error('Error fetching sales stats:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <>
    {userRole === 'salesman' &&   
      <AccessDenied />
    }

    {userRole === 'manager' && 

    <div className='flex flex-col items-center'>
      <div className='flex flex-row justify-center my-[5%]'><h1 className='text-6xl font-bold font-serif'>Check Sales Statistics</h1></div>
      <form className='flex flex-col items-start justify-center border p-4 shadow-xl shadow-slate-600' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}> 
        <div className='p-4 '>
          <label htmlFor="item">Item: </label>
          <select className='bg-gray-200' id="item" value={selectedItemId} onChange={(e) => setSelectedItemId(e.target.value)}>
            <option value="">Select Item</option>
            {items.map((item) => (
              <option key={item.item_id} value={item.item_id}>
                {item.item_name}
              </option>
            ))}
          </select>
        </div>
        <div className='w-full p-4'>
            <button className='outline p-1 mb-4 w-full bg-blue-300 text-gray-800 hover:bg-blue-700 hover:text-white' type="button" onClick={(e) => setDateRange(!dateRange)}>
            {dateRange ? 
            (<span>Select Single Date</span>):
            (<span>Select Date Range</span>)}
            
            </button>
            {dateRange ? 
            (
                <div className='flex flex-col '>
                <div>
                <label htmlFor="startDate">Start Date: </label>
                <input 
                    type="date" 
                    id="startDate"  
                    value={startDate.toISOString().slice(0, 10)} // Format for date input
                    onChange={(e) => setStartDate(new Date(e.target.value))} 
                />
                </div>
                <div>
                <label htmlFor="endDate">End Date: </label>
                <input 
                    type="date" 
                    id="endDate"  
                    value={endDate.toISOString().slice(0, 10)} // Format for date input
                    onChange={(e) => setEndDate(new Date(e.target.value))} 
                />
                </div>
                </div>
                
            ) 
            : (
                <div>
                <label htmlFor="date">Date: </label>
                <input 
                    type="date" 
                    id="date"  
                    value={date.toISOString().slice(0, 10)} // Format for date input
                    onChange={(e) => setDate(new Date(e.target.value))} 
          />
            </div>
            )
            }
        </div>
        <button className='w-full border-1 bg-yellow-300 text-gray-800 hover:bg-yellow-600 hover:text-white p-1 rounded-2xl' type="submit">Fetch Stats</button>
        {/* <a className='w-full my-2' href="/home"><button className='w-full border-1 bg-blue-300 text-gray-800 hover:bg-blue-600 hover:text-white p-1 rounded-2xl' type="button">Return Home</button></a> */}
      </form>
    </div>
    }
    </>
  );
};

export default SalesStatsInputPage;

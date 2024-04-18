import React from 'react';
import { Link } from 'react-router-dom';

const ManagerOptions = () => {
  return (
    <div className='flex flex-col items-center my-[8%] w-[43%] border-8 shadow-2xl shadow-blue-400 p-2 rounded-xl'>
    <h1 className='font-extrabold text-7xl mb-5 '>Manager Panel</h1>
      <Link to="/inventory">
        <button className='bg-blue-400 text-gray-900 font-bold text-xl hover:bg-blue-700 hover:text-white p-3 border-2 rounded-xl my-4 w-96 '>View and Edit Inventory</button> 
      </Link>
      <Link to="/sale">
        <button className='bg-blue-400 text-gray-900 font-bold text-xl hover:bg-blue-700 hover:text-white p-3 border-2 rounded-xl my-4 w-96 '>Make Sale</button> 
      </Link>
      <Link to="/stats">
        <button className='bg-blue-400 text-gray-900 font-bold text-xl hover:bg-blue-700 hover:text-white p-3 border-2 rounded-xl my-4 w-96 '>Check Sales Statistics</button> 
      </Link>
    </div>
  );
};

export default ManagerOptions;

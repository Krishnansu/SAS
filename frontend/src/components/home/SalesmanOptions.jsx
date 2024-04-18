import React from 'react';
import { Link } from 'react-router-dom';

const SalesmanOptions = () => {
  return (
    <div className='flex flex-col items-center my-[12%] w-[40%] border-8 shadow-2xl shadow-blue-400 p-2 rounded-xl'>
    <h1 className='font-extrabold text-7xl mb-5 my-2'>Sales Panel</h1>
      <Link to="/sale">
        <button className='bg-blue-400 text-gray-900 font-bold text-xl hover:bg-blue-700 hover:text-white p-3 border-2 rounded-xl my-4 w-96'>Make Sale</button> 
      </Link>
    </div>
  );
};

export default SalesmanOptions;
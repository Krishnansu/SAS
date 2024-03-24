import React from 'react';
import { Link } from 'react-router-dom';

const SalesmanOptions = () => {
  return (
    <div className='flex flex-col items-center my-[8%] w-[40%] border-8'>
    <h1 className='font-extrabold text-7xl mb-5'>Sales Panel</h1>
      <Link to="/sale">
        <button className='bg-purple-400 text-gray-900 font-bold text-xl hover:bg-purple-700 hover:text-white p-4 border-2 rounded-full my-4 w-96'>Make Sale</button> 
      </Link>
    </div>
  );
};

export default SalesmanOptions;
import React, { useState, useEffect } from 'react';
import ManagerOptions from './ManagerOptions';
import SalesmanOptions from './SalesmanOptions';

const Home = () => {
  const [userRole, setUserRole] = useState(null)
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Retrieve stored user role
    const storedRole = localStorage.getItem('userRole'); 
    setUserRole(storedRole);
    const storedName = localStorage.getItem('userName');
    setUserName(storedName);
  }, []);

  return (
    <>
    {/* <div className='bg-gray-700 absolute inset-x-0 h-[10%] px-5 flex flex-row justify-between items-center'>
        <p1 className='text-white'>Hi, {userName} </p1>
        <a href='/home'><button className='text-white hover:text-gray-300'>Home</button></a>
    </div> */}
    <div className="flex flex-row justify-center"> 
      {userRole === 'manager' && <ManagerOptions />}
      {userRole === 'salesman' && <SalesmanOptions />}
    </div>
    </>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userRole, setUserRole] = useState(null)
  const [userName, setUserName] = useState(null);


    const handleLogout = async () => {
        await api.logout();
        window.location.href = '/'; // Redirect to the login page or home page
    };

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole'); 
    setUserRole(storedRole);
    const storedName = localStorage.getItem('userName');
    setUserName(storedName);

  }, []);

  return (
    <>
    <div className='flex-no-wrap h-16 relative flex w-full bg-gray-700 items-center justify-between p-4'>
        <p1 className='text-white'>Hi, {userName} </p1>
        <div>
        <a href='/home'><button className='text-white hover:text-gray-300 mx-2'>Home</button></a>
        <button className='text-white hover:text-gray-300 mx-2' onClick={handleLogout}>Logout</button>
        </div>
        
    </div>

    </>
  );
};

export default Navbar;
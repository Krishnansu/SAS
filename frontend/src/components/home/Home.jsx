/*  */

import React, { useState, useEffect } from 'react';
import ManagerOptions from './ManagerOptions';
import SalesmanOptions from './SalesmanOptions';


const Home = () => {
  const [userRole, setUserRole] = useState(null)
  const [userName, setUserName] = useState(null);
  console.log("Entered Home page");
  useEffect(() => {
    // Retrieve stored user role
    const storedRole = localStorage.getItem('userRole'); 
    setUserRole(storedRole);
    const storedName = localStorage.getItem('userName');
    setUserName(storedName);
  }, []);

  return (
    <>
    <div className="flex flex-row justify-center"> 
      {userRole === 'manager' && <ManagerOptions />}
      {userRole === 'salesman' && <SalesmanOptions />}
    </div>
    </>
  );
};

export default Home;
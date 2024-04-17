import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState(''); // Update state variable
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/signup');
};

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { token, userRole, userName } = await api.login(email, password); // Pass email here
      localStorage.setItem('authToken', token); 
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userName', userName);
      // window.location.href = '/home';  
      navigate('/home');
    } catch (error) {
       console.log('Login error: ' + error.message); 
    }
  };

  return (
    <div className='w-full my-[10%] flex flex-col justify-center items-center '>
    <form onSubmit={handleLogin} className='bg-white shadow-2xl rounded-lg px-16 pt-6 pb-8 mb-4'>
      <h1 className='flex flex-row justify-center text-3xl font-bold'>Login</h1>
      <div>
        <label className='block text-gray-600 text-md font-semibold mb-2 my-6' htmlFor="email">Email:</label> {/* Update label */}
        <input className='outline outline-1 outline-gray-300 rounded-xl shadow-sm px-2 ' type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /> 
      </div>
      <div>
        <label className='block text-gray-600 text-md font-semibold mb-2 my-6' htmlFor="password">Password:</label>
        <input className='outline outline-1 outline-gray-300 rounded-xl shadow-sm px-2 ' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className='mt-6 ml-[30%] outline outline-blue-400 rounded-full py-1 px-6 hover:bg-blue-500 hover:text-white' type="submit">Login</button>
    </form>
    <div className='flex flex-row justify-center'>
        <button className='hover:text-blue-500' onClick={handleNavigation} >New User ?</button>
    </div>
    </div>
  );
};

export default Login;

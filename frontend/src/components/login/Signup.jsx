import React, { useState } from 'react';
import api from '../../utils/api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('salesman'); // Default to salesman

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const userData = { 
        user_name: username, 
        user_email: email, 
        user_password: password,
        user_role: role
      };

      await api.signup(userData); 
      console.log('Signup successful!'); 
      window.location.href = '/';
    } catch (error) {
      console.log('Signup error: ' + error.message); 
    }
  };

  return (
    <div className='w-full mt-[10%] flex flex-col justify-center items-center '>
    <form onSubmit={handleSignup} className='bg-white shadow-md rounded px-16 pt-6 pb-8 mb-4'>
    <h1 className='flex flex-row justify-center text-3xl font-bold'>Sign Up</h1>
      <div>
      <label className='block text-gray-600 text-md font-semibold mb-2 my-6' htmlFor="username">Username:</label>
      <input className='outline outline-1 outline-gray-300 rounded-xl shadow-sm px-2 ' type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label className='block text-gray-600 text-md font-semibold mb-2 my-6' htmlFor="email">Email:</label> 
        <input className='outline outline-1 outline-gray-300 rounded-xl shadow-sm px-2 ' type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /> 
      </div>
      <div>
        <label className='block text-gray-600 text-md font-semibold mb-2 my-6' htmlFor="password">Password:</label>
        <input className='outline outline-1 outline-gray-300 rounded-xl shadow-sm px-2 ' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div> 
        <label className='block text-gray-600 text-md font-semibold mb-2 my-6'>Role:</label>
        <div> 
          <input 
            className='mx-2'
            type="radio" 
            value="salesman" 
            checked={role === 'salesman'} 
            onChange={() => setRole('salesman')} 
          /> Salesman 

          <input 
          className='mx-2'
            type="radio" 
            value="manager" 
            checked={role === 'manager'} 
            onChange={() => setRole('manager')} 
          />  Manager
        </div>
      </div>

      <button className='mt-6 ml-[30%] outline outline-purple-600 rounded-full py-1 px-6 hover:bg-purple-600 hover:text-white' type="submit">Sign Up</button>
    </form>
    <div className='flex flex-row justify-center'>
        <a className='hover:text-purple-500' href='/'>Existing User ?</a>
    </div>
  </div>
  );
};

export default Signup;

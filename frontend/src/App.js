/* eslint-disable */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../src/styles/index.css';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Home from './components/home/Home';
import Inventory from './components/inventory/Inventory';
import EditItemPage from './components/inventory/EditItemPage';
import AddItemPage from './components/inventory/AddItemPage';
import SalesPage from './components/sale/SalesPage';
import BillingPage from './components/sale/BillingPage';
import SalesStatsInputPage from './components/salesStats/SalesStatsInputPage';
import SalesStats from './components/salesStats/SalesStats';
import Navbar from './components/navbar/Navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<><Navbar /><Home /></>} />
          <Route path="/inventory" element={<><Navbar /><Inventory /></>} />
          <Route path="/inventory/edit/:itemId" element={<><Navbar /><EditItemPage /></>} />
          <Route path="/inventory/add" element={<><Navbar /><AddItemPage /></>} />
          <Route path="/sale" element={<><Navbar /><SalesPage /></>} />
          <Route path="/billing/:billId" element={<><Navbar /><BillingPage /></>} />
          <Route path="stats" element={<><Navbar /><SalesStatsInputPage /></>} />
          <Route path="stats/:itemId" element={<><Navbar /><SalesStats /></>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

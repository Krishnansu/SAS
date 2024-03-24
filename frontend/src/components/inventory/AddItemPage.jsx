import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AddItemPage = () => {
  const [itemName, setItemName] = useState('');
  const [sellPrice, setSellPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newItemData = {
      item_name: itemName,
      sell_price: sellPrice,
      cost_price: costPrice,
      stock: stock
    };

    try {
      const token = localStorage.getItem('authToken');
      await api.addItem(token, newItemData);
      navigate('/inventory'); // Redirect to inventory page on success
    } catch (error) {
      console.error("Error adding item:", error); 
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <div className='flex flex-row justify-center'>
      <form className='flex flex-col items-start my-[10%] border p-4 shadow-xl shadow-slate-500' onSubmit={handleSubmit}>
        <h1 className='p-2 text-2xl font-bold text-gray-800'>Add Item</h1>
          <div className='p-2'>
            <label htmlFor="itemName">Item Name:       </label>
            <input
              className='border-1 border-gray-500 bg-slate-200'
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className='p-2'>
            <label htmlFor="costPrice">Cost Price:       </label>
            <input
              className='border-1 border-gray-500 bg-slate-200'
              type="number"
              id="costPrice"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              required
            />
          </div>
          <div className='p-2'>
            <label htmlFor="sellPrice">Selling Price:       </label>
            <input
              className='border-1 border-gray-500 bg-slate-200'
              type="number"
              id="sellPrice"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              required
            />
          </div>
          <div className='p-2'>
            <label htmlFor="stock">Stock:       </label>
            <input
              className='border-1 border-gray-500 bg-slate-200'
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

            <div className='flex flex-row justify-center p-2 mx-[25%]'>
            <button className='border-1 bg-yellow-300 text-gray-800 hover:bg-yellow-600 hover:text-white p-2 rounded-2xl' type="submit">Submit</button>
            </div>
          
        </form>
    </div>
  );
};

export default AddItemPage;

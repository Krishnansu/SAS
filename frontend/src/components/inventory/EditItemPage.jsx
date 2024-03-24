import React, { useState, useEffect } from 'react';
import api from '../../utils/api'; // Assuming you have your API functions in api.js
import { useParams, useNavigate } from 'react-router-dom';

const EditItemPage = () => {
  // State to get itemId from the URL
  const { itemId } = useParams();

  // States to manage item data and form fields
  const [itemData, setItemData] = useState(null);
  const [itemName, setItemName] = useState('');
  const [sellPrice, setSellPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  // Fetch item data when the component loads
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.fetchItem(token, itemId); // Assuming you have this function
        setItemData(response);
        // Pre-fill the form fields
        setItemName(response.item_name);
        setSellPrice(response.sell_price);
        setCostPrice(response.cost_price);
        setStock(response.stock);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = {
      item_name: itemName,
      sell_price: sellPrice,
      cost_price: costPrice,
      stock: stock,
    };

    try {
      const token = localStorage.getItem('authToken');
      await api.modifyItem(token, itemId, updatedData); 
      navigate('/inventory'); 
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className='flex flex-row justify-center'>
      {itemData ? ( // Display the form only when itemData is loaded
        <form className='flex flex-col items-start my-[10%] border p-4 shadow-xl shadow-slate-500' onSubmit={handleSubmit}>
        <h1 className='p-2 text-2xl font-bold text-gray-800'>Edit Item</h1>
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
            <button className='border-1 bg-yellow-300 text-gray-800 hover:bg-yellow-600 hover:text-white p-2 rounded-2xl' type="submit">Save Changes</button>
            </div>
          
        </form>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  );
};

export default EditItemPage;

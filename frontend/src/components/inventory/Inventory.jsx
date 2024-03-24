import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import InventoryItem from './InventoryItem';
import { useNavigate } from 'react-router-dom';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await api.fetchItems(token);
      setInventory(response);
    } catch (error) {
      setError("Error fetching inventory: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const token = localStorage.getItem('authToken');
      await api.removeItem(token, itemId);

      fetchInventory();
    } catch (error) {
      setError("Error deleting item: " + error.message);
    }
  };

  const navigate = useNavigate(); 

  const handleAddItem = () => {
    navigate('/inventory/add');
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className=''>
      <div className='flex flex-row justify-center my-[3%]'><h1 className='text-4xl font-bold'>Inventory</h1></div>
      <div className='flex flex-row justify-end mb-4'>
      <button onClick={handleAddItem} className='border-2 border-black px-3  bg-yellow-300 text-gray-800 hover:bg-orange-500 hover:text-white p-2 rounded-2xl'>Add New Item</button>
      </div>
      
      {isLoading && <p>Loading inventory...</p>}
      {error && <p className="error">{error}</p>}
      {inventory.length > 0 ? (
        <div className='grid grid-cols-5 gap-y-8 my-2'>
          {inventory.map((item) => (
            <InventoryItem
              key={item.item_id}
              item={item}
              onDelete={handleDelete}
              onEdit={() => navigate(`/inventory/edit/${item.item_id}`)} 
            />
          ))}
        </div>
      ) : (
        <p>No items in inventory.</p>
      )}
    </div>
  );
};

export default InventoryPage;

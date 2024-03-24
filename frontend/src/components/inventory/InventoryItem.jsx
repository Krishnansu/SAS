import React from 'react';

const InventoryItem = ({ item, onDelete, onEdit }) => (
  <div className='flex flex-col  items-start border-4 p-4'>
    <div className='my-1'>Name: {item.item_name}</div>
    <div className='my-1'>Cost Price: {item.cost_price}</div>
    <div className='my-1'>Sell Price: {item.sell_price}</div>
    <div className='my-1'>Stock: {item.stock}</div>
    <div className='flex flex-row justify-stretch my-2'>
    <button className='border-1 bg-purple-400 text-gray-800 hover:bg-purple-700 hover:text-white mr-2 px-2 rounded-2xl' onClick={() => onDelete(item.item_id)}>Delete</button>
    <button className='border-1 bg-purple-400 text-gray-800 hover:bg-purple-700 hover:text-white px-2 rounded-2xl' onClick={onEdit}>Edit</button> 
    </div>
    
  </div>
);

export default InventoryItem;

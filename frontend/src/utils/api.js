/* eslint-disable */
// api.js
const BASE_URL = 'http://localhost:5000/api'; 

// ... other code ...

// Authentication Functions
const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_email: email, user_password: password }) 
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json(); // Returns JWT token 
};

const signup = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData) 
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json(); // Returns details based on your backend
};

// ...other api.js functions...

const logout = async () => {
  try { 
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

    if (!response.ok) {
      throw new Error('Could not log out');
    }
  } catch (error) {
    console.error("Error logging out:", error);
  } finally {
    // Clear token and proceed with logout logic regardless of response success
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName'); 
    // Redirect to the login screen or desired post-logout page
  }
};


const fetchItems = async (token) => {
  const response = await fetch(`${BASE_URL}/inventory`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Could not fetch items');
  }

  return response.json(); 
};

const fetchItem = async (token, itemId) => {
  const response = await fetch(`${BASE_URL}/inventory/${itemId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Could not fetch item');
  }

  return response.json(); 
};

const addItem = async (token, itemData) => {
  const response = await fetch(`${BASE_URL}/inventory`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemData) 
  });

  if (!response.ok) {
    throw new Error('Could not add item'); 
  }
  return response.json(); // Might return the added item with ID
};

const removeItem = async (token, itemId) => {
  const response = await fetch(`${BASE_URL}/inventory/${itemId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Could not delete item'); 
  }

  return response.json(); // Might return deleted item details 
};

const modifyItem = async (token, itemId, updatedData) => {
  const response = await fetch(`${BASE_URL}/inventory/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData) 
  });

  if (!response.ok) {
    throw new Error('Could not update item'); 
  }
  return response.json(); // Might return the updated item
};

const addSale = async (token, saleData) => {
  const response = await fetch(`${BASE_URL}/sales/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saleData) 
  });

  if (!response.ok) {
    throw new Error('Could not add sale');
  }

  return response.json(); 
};

const createBulkSale = async (token, items) => {
  const response = await fetch(`${BASE_URL}/sales/bulk`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items }) 
  });

  if (!response.ok) {
    throw new Error('Could not create bulk sale');
  }
  return response.json(); 
};

const fetchAllSales = async (token) => {
  const response = await fetch(`${BASE_URL}/sales/`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Could not fetch sales data');
  }

  return response.json();  
};

const fetchSalesByBillId = async (token, billId) => {
  const response = await fetch(`${BASE_URL}/sales/bill/${billId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Could not fetch sales by bill ID');
  }

  return response.json();  
};

const fetchSalesByItemId = async (token, itemId) => {
  const response = await fetch(`${BASE_URL}/sales/item/${itemId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Could not fetch sales by item ID');
  }

  return response.json();  
};

const fetchSalesStatsByDate = async (token, itemId, date) => {
  const formattedDate = encodeURIComponent(date.toISOString()); // Encode the date for the query parameter

  const response = await fetch(`${BASE_URL}/sales/stats/item/${itemId}?date=${formattedDate}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Could not fetch sales stats by date');
  }

  return response.json();  
};

const fetchSalesStatsByDateRange = async (token, itemId, startDate, endDate) => {
  const formattedStartDate = encodeURIComponent(startDate.toISOString());
  const formattedEndDate = encodeURIComponent(endDate.toISOString());

  const response = await fetch(`${BASE_URL}/sales/stats/item/${itemId}/range?startDate=${formattedStartDate}&endDate=${formattedEndDate}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Could not fetch sales stats by date range');
  }

  return response.json();  
};



export default {
    login,
    signup,
    logout,
    fetchItems,
    fetchItem, 
    addItem,
    removeItem,
    modifyItem,
    addSale,
    createBulkSale,
    fetchAllSales,
    fetchSalesByBillId, 
    fetchSalesByItemId,
    fetchSalesStatsByDate,
    fetchSalesStatsByDateRange
  };

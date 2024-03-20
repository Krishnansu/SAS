const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authMiddleware = require('./src/middleware/auth');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const salesRoutes = require('./src/routes/salesRoutes'); 

// Load environment variables
dotenv.config(); 

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB: ', err));


app.use(express.json()); 


app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/inventory', authMiddleware, inventoryRoutes);
app.use('/api/sales', authMiddleware, salesRoutes);


// Start the server
const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));

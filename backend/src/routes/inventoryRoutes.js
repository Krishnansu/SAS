const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/auth'); // Import your middleware

// Protected routes
router.post('/', authMiddleware, inventoryController.addItem);
router.delete('/:itemId', authMiddleware, inventoryController.removeItem);  
router.patch('/:itemId', authMiddleware, inventoryController.modifyItem); 

// Public route (if needed)
router.get('/', inventoryController.fetchItems); // Assuming this is OK to be public
router.get('/:itemId',inventoryController.fetchItem);

module.exports = router;

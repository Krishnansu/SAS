const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const authMiddleware = require('../middleware/auth'); // Import your middleware

// Protected sales routes
router.post('/', authMiddleware, salesController.addSale);
router.get('/', authMiddleware, salesController.fetchAllSales);
router.get('/bill/:billId', authMiddleware, salesController.fetchSalesByBillId);
router.get('/item/:itemId', authMiddleware, salesController.fetchSalesByItemId);
router.get('/stats/item/:itemId', authMiddleware, salesController.fetchSalesStatsByDate);
router.get('/stats/item/:itemId/range', authMiddleware, salesController.fetchSalesStatsByDateRange);
router.post('/bulk', authMiddleware, salesController.createBulkSale);

module.exports = router; 

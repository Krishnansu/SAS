const Sales = require('../models/sales');
const Inventory = require('../models/inventory'); // Assuming you have an Inventory model
const { getNextSequence } = require('../utils');
// Add sales data
exports.addSale = async (req, res) => {
    try {
        // Consider: Validate if enough quantity exists in inventory
        const newSale = new Sales(req.body);
        const savedSale = await newSale.save();
        res.status(201).json(savedSale);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.createBulkSale = async (req, res) => {
    try {
        const employee = req.userData.userName;
        const billId = await getNextSequence('bill_id');
        const {items} = req.body;
        // Validate and create sales in a loop
        const createdSales = [];
        for (const item of items) {
            const { item_id, quantity } = item;

            // 1. Find the item in inventory
            const inventoryItem = await Inventory.findOne({ item_id });
            if (!inventoryItem) {
                return res.status(404).json({ message: `Item with ID ${item_id} not found` });
            }

            // 2. Check stock
            if (quantity > inventoryItem.stock) {
                return res.status(400).json({ message: `Insufficient stock for item with ID ${item_id}` });
            }

            // 3. Create sale (within the loop)
            const newSale = new Sales({
                item_id,
                quantity,
                sell_date: new Date(), 
                cost_price: inventoryItem.cost_price,
                sell_price: inventoryItem.sell_price,
                bill_id: billId,
                employee_name: employee
            });
            createdSales.push(newSale);

            // Update Inventory 
            inventoryItem.stock -= quantity;
            await inventoryItem.save();
        }

        // Bulk Save 
        await Sales.insertMany(createdSales);
        

        res.status(201).json(createdSales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Fetch all sales data
exports.fetchAllSales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch sales by bill_id
exports.fetchSalesByBillId = async (req, res) => {
    try {
        const sales = await Sales.find({ bill_id: req.params.billId });
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch sales by item_id
exports.fetchSalesByItemId = async (req, res) => {
    try {
        const sales = await Sales.find({ item_id: req.params.itemId });
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.fetchSalesStatsByDate = async (req, res) => {
    try {
  
        const startDate = new Date(req.query.date);  
        const endDate = new Date(req.query.date);

        console.log(startDate);
        startDate.setUTCHours(0, 0, 0, 0);
        endDate.setUTCHours(23, 59, 59, 999);

        const stats = await Sales.aggregate([
            { 
                $match: { 
                    item_id: parseInt(req.params.itemId), 
                    sell_date: { $gte: startDate, $lte: endDate } 
                }

            },
            {
                $group: {
                    _id: null, // Single group for all matching documents
                    totalQuantity: { $sum: '$quantity' },
                    totalPrice: { $sum: { $multiply: ['$sell_price', '$quantity' ] } },
                    totalProfit: { $sum: { $multiply: [{ $subtract: ['$sell_price', '$cost_price' ] }, '$quantity' ] } } 
                }
            }
        ]);
        console.log(stats);
        res.json(stats[0] || { totalQuantity: 0, totalPrice: 0, totalProfit: 0 }); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch sales statistics (item_id and date range)
exports.fetchSalesStatsByDateRange = async (req, res) => {
    try {
        const startDate = new Date(req.query.startDate); 
        startDate.setUTCHours(0, 0, 0, 0);
        const endDate = new Date(req.query.endDate);
        endDate.setUTCHours(23, 59, 59, 999);

        const stats = await Sales.aggregate([
            { 
                $match: { 
                    item_id: parseInt(req.params.itemId), 
                    sell_date: { $gte: startDate, $lte: endDate } 
                } 
            },
            {
                $group: {
                    _id: null, 
                    totalQuantity: { $sum: '$quantity' },
                    totalPrice: { $sum: { $multiply: ['$sell_price', '$quantity' ] } },
                    totalProfit: { $sum: { $multiply: [{ $subtract: ['$sell_price', '$cost_price' ] }, '$quantity' ] } }
                }
            }
        ]);

        res.json(stats[0] || { totalQuantity: 0, totalPrice: 0, totalProfit: 0 }); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
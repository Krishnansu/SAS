const Inventory = require('../models/inventory');
const { getNextSequence } = require('../utils');
// Add an item
exports.addItem = async (req, res) => {
    try {
        const itemId = await getNextSequence('item_id');

        const newItem = new Inventory({
            ...req.body,
            item_id: itemId
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove an item
exports.removeItem = async (req, res) => {
    try {
        const deletedItem = await Inventory.findOneAndDelete({ item_id: req.params.itemId });
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' }); 
        }
        res.json({ message: 'Item deleted', deletedItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Modify an item 
exports.modifyItem = async (req, res) => {
    try {
        const updateData = { ...req.body, modified_date: Date.now() };
        const updatedItem = await Inventory.findOneAndUpdate(
            { item_id: req.params.itemId }, // Search by item_id
            updateData,
            { new: true } 
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' }); 
        }
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch all items 
exports.fetchItems = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ... add more if needed (e.g., fetch a single item)
exports.fetchItem = async (req, res) => {
    try {
        const item = await Inventory.findOne({item_id: req.params.itemId});
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
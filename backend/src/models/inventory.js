const mongoose = require('mongoose');
const { getNextSequence } = require('../utils');

let currentItemId = 6;
function generateUniqueItemId() {
    return currentItemId++;
}

const inventorySchema = new mongoose.Schema({
    item_id: { type: Number, required: true, unique: true , default: () => generateUniqueItemId() },
    item_name: { type: String, required: true },
    cost_price: { type: Number, required: true },
    sell_price: { type: Number, required: true },
    stock: { type: Number, required: true } 
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;

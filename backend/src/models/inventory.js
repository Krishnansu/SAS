const mongoose = require('mongoose');


const inventorySchema = new mongoose.Schema({
    item_id: { type: Number, required: true, unique: true },
    item_name: { type: String, required: true },
    cost_price: { type: Number, required: true },
    sell_price: { type: Number, required: true },
    stock: { type: Number, required: true },
    created_date: {
        type: Date,
        default: Date.now // Automatic timestamp for when the item is created
      },
    modified_date: {
        type: Date,
        default: Date.now
      }
});

inventorySchema.pre('save', function (next) {
    this.modified_date = Date.now();
    next(); 
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;




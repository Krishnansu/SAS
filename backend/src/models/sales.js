const mongoose = require('mongoose');



const salesSchema = new mongoose.Schema({
    item_id: { type: Number, required: true }, 
    quantity: { type: Number, required: true },
    bill_id: { type: Number, required: true },
    employee_name: {type: String, required: true},
    sell_date: { type: Date, required: true }, 
    cost_price: { type: Number, required: true },
    sell_price: { type: Number, required: true }
});

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;

//user_id_salesman

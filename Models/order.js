const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user_id: { type: Number },
    restaurat_id: {type: Number},
});

const Order = model('Order', orderSchema);

module.exports = Order;
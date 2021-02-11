const { Schema, model } = require('mongoose');
const { Stream } = require('nodemailer/lib/xoauth2');

const orderSchema = new Schema({
    id: {type: Number},
    time: { type: String },
    group_id: {type: Number},
    game_id: {type: Number, default: null},
    restaurants_id: [{type: String}], // google restaurant id
    chosen_rest_id: {type: String}
});

const Order = model('Order', orderSchema);

module.exports = Order;

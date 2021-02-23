const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    id: {type: Number},
    time: { type: String },
    group_id: {type: Number},
    game_id: {type: Number, default: null},
    restaurants_id: [{user: {type: Number}, rest: {type: String}, score: {type: Number}}], // google restaurant id
    chosen_rest_id: {type: String},
    scores: [{_user: {type: Number}, score: {type: Number}}]
});

const Order = model('Order', orderSchema);

module.exports = Order;

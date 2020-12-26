const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema({
    id: { type: Number },
    name: {type: String},
    address: { type: String },
    style: { type: String },
    price: {type: Number},
    rate: {type: String },
}, { collection: 'restaurants' });

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
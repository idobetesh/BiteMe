const { Schema, model } = require('mongoose');
const orderSchema = require('./order');

const groupSchema = new Schema({
    id: { type: Number },
    participants_id: [{ type: Number }],
    order_id: {type: Number, default: null},
}, { collection: 'groups' });

const Group = model('Group', groupSchema);

module.exports = Group;
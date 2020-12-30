const { Schema, model } = require('mongoose');
const orderSchema = require('./order');

const groupSchema = new Schema({
    id: { type: Number },
    users_id: [{ type: String }],
    orders: [ orderSchema ],
}, { collection: 'groups' });

const Group = model('Group', groupSchema);

module.exports = Group;
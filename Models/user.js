const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: { type: Number },
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true},
    admin: { type: Boolean, default: false },
    group_id: {type: Number} 
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
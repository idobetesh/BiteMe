const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: { type: Number },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required:true },
    admin: { type: Boolean}
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
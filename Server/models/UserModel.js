const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cart: {type: [], required: true},
    wishlist: {type: [], required: true},
    orders: {type: [], required: true}
    }, 
    {collection: 'users'}
);

model = mongoose.model('UserData', User);

module.exports = model;

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/UserModel');
const jwt = require('jsonwebtoken');
const cartRouter = require('./routes/cart.js');
const wishlistRouter = require('./routes/wishlist.js');
const orderRouter = require('./routes/orders.js');
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://db:27017/mern-ecommerse-website').then(() => console.log('Connected to Mongoose'));

const privateKey = '123';

app.get('/users', async(req, res) => {

    try{
    const token = req.headers['x-access-token'];

    const decoded = jwt.verify(token, privateKey)
    const id = decoded._id;

    const user = await User.findById(id)
    res.send(user);
    }
    catch(err){
        res.send({error: err.message});
    }
})

app.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    if(!user){
        res.send({status: "Error", message: "Can't Find User, Please check input or Register"});
        return;
    }
    
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(validPass){
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email
        }, privateKey);
        res.send({ status: "OK", user: user, token: token});
    }else
        res.send({ status: "Error", message: "Wrong Password" });
})

app.post('/register', async (req, res) => {
    console.log(req.body)
    try{
        const newPass = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPass,
            cart: [],
            wishlist: [],
            orders: []
        })
        res.send(req.body);
    }
    catch(err){
        console.log(err)
        res.send(err.message);
    }
})

app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter);
app.use('/orders', orderRouter);

app.get('*', async (req, res) => {
    res.send('Unknown Request');
})

app.listen(3000, () => console.log('Server Started on port 3000'));
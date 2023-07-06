const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/UserModel');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mern-ecommerse-website').then(() => console.log('Connected to Mongoose'));

const privateKey = '123';

app.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, privateKey);
        res.send({ status: "OK", user: user, token: token});
    }else
        res.send({ status: "Error", message: "Can't Find User, Please check input or Register" });
})

app.post('/register', async (req, res) => {
    console.log(req.body)
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cart: []
        })
        res.send(req.body);
    }
    catch(err){
        console.log(err)
        res.send(err.message);
    }
})

app.get('/cart/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.send(user.cart);
    }
    catch(err){
        res.send(err.message)
    }
})

app.post('/cart/:id', async (req, res) => {
    console.log('1')
    try{
        const user = await User.findById(req.params.id)
        console.log('2')
        switch(req.body.type){
            case 'increment':
                console.log('3')
                user.cart.map( async item => {
                    if(item.id === req.body.item.id)
                        item.quantity = item.quantity + 1;
                        setTimeout(() => user.save(), 1000);
                        return;
                })
                res.send('Operation Failed')
                return;
            case 'addItem':
                console.log('4')
                console.log(req.body.item)
                console.log(user)
                await user.cart.push(req.body.item);
                await user.save();
                return;
            default:
                console.log('5')
                res.send('Invalid parameters')
                return;
        }
    }
    catch(err){
        console.log('6')
        res.send(err.message)
    }

})

app.get('*', async (req, res) => {
    res.send('Unknown Request');
})

app.listen(3000, () => console.log('Server Started on port 3000'));
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
        res.send({ status: "OK", user: token});
    }else
        res.send({ status: "Error", message: "Can't Find User, Please check input or Register" });
})

app.post('/register', async (req, res) => {
    console.log(req.body)
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.send(req.body);
    }
    catch(err){
        console.log(err)
        res.send(err.message);
    }
})

app.listen(3000, () => console.log('Server Started on port 3000'));
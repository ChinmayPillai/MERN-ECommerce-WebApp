const express = require('express');
const wishlistRouter = express.Router();
const User = require('../models/UserModel');

wishlistRouter.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.send(user.cart);
    }
    catch(err){
        res.send(err.message)
    }
})

wishlistRouter.post('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(req.body.item);
    console.log('Post')
    //console.log(user);
    await user.cart.push(req.body.item);
    await user.save();
    res.send('Success');
    return;
})

wishlistRouter.put('/:id', async (req, res) => {
    console.log(`Incrementing Quantity of ${req.params.id}\n`);
    const user = await User.findOneAndUpdate({'_id': req.params.id, 'cart.id': req.body.item.id}, {'$inc': {'cart.$.quantity': 1}})
    res.send(user);
    /*const user = await User.findById(req.params.id);
    user.cart.map( async item => {
    if(item.id === req.body.item.id)
        item.quantity = item.quantity + 1;
        setTimeout(async () => await user.save(), 1000);
        return;
    })
    res.send('Operation Failed');
    return;*/
})

module.exports = wishlistRouter;
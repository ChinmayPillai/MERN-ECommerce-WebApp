const express = require('express');
const cartRouter = express.Router();
const User = require('../models/UserModel');

cartRouter.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.send(user.cart);
    }
    catch(err){
        console.log(err.message + '\n');
        res.send(err.message);
    }
})

cartRouter.post('/:id', async (req, res) => {
    console.log('Cart Post')
    try{
        const user = await User.findById(req.params.id);
        console.log(req.body.item);
        //console.log(user);
        await user.cart.push(req.body.item);
        await user.save();
        res.send('Added to Cart');
        return;
        }
        catch(err){
            console.log(err.message + '\n');
            res.send(err.message);
    }
})

cartRouter.put('/:id', async (req, res) => {
    try{
        console.log(req.params.id + '\n' + req.body.item.id + '\n')
        if(req.body.action === 'increment'){
            console.log(`Incrementing Quantity of ${req.params.id}\n`);
            const user = await User.findOneAndUpdate({'_id': req.params.id, 'cart.id': req.body.item.id}, {'$inc': {'cart.$.quantity': 1}})
            res.send(user);
        }
        else if(req.body.action === 'decrement'){
            console.log(`Decrementing Quantity of ${req.params.id}\n`);
            const user = await User.findOneAndUpdate({'_id': req.params.id, 'cart.id': req.body.item.id}, {'$inc': {'cart.$.quantity': -1}})
            res.send(user);
        }
        else if(req.body.action === 'delete'){
            const user = await User.findOneAndUpdate({'_id': req.params.id}, {'$pull': {'cart': {id: req.body.item.id}}})
            res.send(user);
        }
    }
    catch(err){
        console.log(err.message + '\n');
        res.send(err.message);
    }
    
})


module.exports = cartRouter;
const express = require('express');
const cartRouter = express.Router();
const User = require('../models/UserModel');
const redis = require('../redis-client');

cartRouter.get('/:id', async (req, res) => {
    try{
        const user = await redis.call('JSON.GET', 'user:'+req.params.id)

        if(!user){
            user = await User.findById(req.params.id)
            redis.call('JSON.SET', 'user:'+req.params.id, '.', JSON.stringify(user))
            redis.expire("user:"+req.params.id, 3600)
        }
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
        await user.cart.unshift(req.body.item);
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
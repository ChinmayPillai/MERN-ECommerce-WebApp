const express = require('express');
const orderRouter = express.Router();
const User = require('../models/UserModel');
const redis = require('../redis-client');

orderRouter.get('/:id', async (req, res) => {
    try{
        let user = await redis.call('JSON.GET', 'user:'+req.params.id)

        if(!user){
            user = await User.findById(req.params.id)
            redis.call('JSON.SET', 'user:'+req.params.id, '.', JSON.stringify(user))
            redis.expire("user:"+req.params.id, 3600)
        }
        else{
            user = JSON.parse(user);
        }
        res.send(user.orders);
    }
    catch(err){
        res.send(err.message)
    }
})

orderRouter.post('/:id', async (req, res) => {
    console.log('Order Post')
    try{
        const user = await User.findById(req.params.id);
        //console.log(req.body.item);
        
        await user.orders.unshift(req.body.item);
        await user.save();
        await redis.call('JSON.SET', 'user:'+req.params.id, '.orders', JSON.stringify(user.orders));
        res.send('Added to Orders');
        return;
    }
    catch(err){
        console.log(err.message + '\n');
        res.send(err.message);
    }
})

orderRouter.put('/:id', async (req, res) => {
    console.log('Order Put')
    try{
        const user = await User.findById(req.params.id);
        //console.log(req.body.item);
        req.body.items.map(async (item) => {
            await user.orders.unshift(item);
        });
        
        await user.save();
        await redis.call('JSON.SET', 'user:'+req.params.id, '.orders', JSON.stringify(user.orders));
        res.send('Updated Orders');
        return;
    }
    catch(err){
        console.log(err.message + '\n');
        res.send(err.message);
    }
})


module.exports = orderRouter;
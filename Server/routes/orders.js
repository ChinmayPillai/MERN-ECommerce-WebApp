const express = require('express');
const orderRouter = express.Router();
const User = require('../models/UserModel');
const redis = require('../redis-client');

orderRouter.get('/:id', async (req, res) => {
    try{
        //const user = await redis.call('JSON.GET', 'user:'+req.params.id)

        // if(!user){
            const user = await User.findById(req.params.id)
            // redis.call('JSON.SET', 'user:'+req.params.id, '.', JSON.stringify(user))
            // redis.expire("user:"+req.params.id, 3600)
        //}
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
        console.log(req.body.item);
        console.log(user);
        await user.orders.unshift(req.body.item);
        await user.save();
        res.send('Added to Orders');
        return;
        }
        catch(err){
            console.log(err.message + '\n');
            res.send(err.message);
    }
})


module.exports = orderRouter;
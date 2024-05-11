const express = require('express');
const cartRouter = express.Router();
const User = require('../models/UserModel');
const redis = require('../redis-client');

cartRouter.get('/:id', async (req, res) => {
    try{
        let user = await redis.call('JSON.GET', 'user:'+req.params.id)

        if(!user){
            console.log('Setting user in Redis');
            user = await User.findById(req.params.id)
            redis.call('JSON.SET', 'user:'+req.params.id, '.', JSON.stringify(user))
            redis.expire("user:"+req.params.id, 3600)
        }
        else{
            user = JSON.parse(user);
        }
        console.log(user);
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
        // console.log(req.body.item);
        //console.log(user);
        await user.cart.unshift(req.body.item);
        await user.save();
        await redis.call('JSON.SET', 'user:'+req.params.id, '.cart', JSON.stringify(user.cart));
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
        //console.log(req.params.id + '\n' + req.body.item.id + '\n')
        if(req.body.action === 'increment'){
            console.log(`Incrementing Quantity of ${req.params.id}\n`);
            const user = await User.findOneAndUpdate({'_id': req.params.id, 'cart.id': req.body.item.id}, {'$inc': {'cart.$.quantity': 1}}, { new: true })
            await redis.call('JSON.SET', 'user:'+req.params.id, '.cart', JSON.stringify(user.cart));
            res.send(user);
        }
        else if(req.body.action === 'decrement'){
            console.log(`Decrementing Quantity of ${req.params.id}\n`);
            const user = await User.findOneAndUpdate({'_id': req.params.id, 'cart.id': req.body.item.id}, {'$inc': {'cart.$.quantity': -1}}, { new: true })
            await redis.call('JSON.SET', 'user:'+req.params.id, '.cart', JSON.stringify(user.cart));
            res.send(user);
        }
        else if(req.body.action === 'delete'){
            console.log(`Deleting ${req.params.id}\n`);
            const user = await User.findOneAndUpdate({'_id': req.params.id}, {'$pull': {'cart': {id: req.body.item.id}}}, { new: true })
            await redis.call('JSON.SET', 'user:'+req.params.id, '.cart', JSON.stringify(user.cart));
            res.send(user);
        }else if(req.body.action === 'clear'){
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: { cart: [] } },
                { new: true }
            );
            await redis.call('JSON.SET', 'user:'+req.params.id, '.cart', JSON.stringify(user.cart));
            console.log(user.cart)
            res.send(user);
        }
    }
    catch(err){
        console.log(err.message + '\n');
        res.send(err.message);
    }
    
})


module.exports = cartRouter;
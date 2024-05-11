const express = require('express');
const wishlistRouter = express.Router();
const User = require('../models/UserModel');
const redis = require('../redis-client');

wishlistRouter.get('/:id', async (req, res) => {
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
        console.log(user);
        res.send(user.wishlist);
    }
    catch(err){
        res.send(err.message)
    }
})

wishlistRouter.post('/:id', async (req, res) => {
    console.log('Wishlist Post')
    try{
        const user = await User.findById(req.params.id);
        //console.log(req.body.item);
        
        await user.wishlist.unshift(req.body.item);
        await user.save();
        await redis.call('JSON.SET', 'user:'+req.params.id, '.wishlist', JSON.stringify(user.wishlist));
        res.send('Added to Wishlist');
        return;
        }
        catch(err){
            console.log(err.message + '\n');
            res.send(err.message);
    }
})

wishlistRouter.put('/:id', async (req, res) => {
    try{
        console.log(req.params.id + '\n' + req.body.item.id + '\n')
        if(req.body.action === 'delete'){
            const user = await User.findOneAndUpdate({'_id': req.params.id}, {'$pull': {'wishlist': {id: req.body.item.id}}}, { new: true })
            await redis.call('JSON.SET', 'user:'+req.params.id, '.wishlist', JSON.stringify(user.wishlist));
            res.send(user);
        }
    }
    catch(err){
        console.log(err.message + '\n');
        res.send(err.message);
    }
})

module.exports = wishlistRouter;
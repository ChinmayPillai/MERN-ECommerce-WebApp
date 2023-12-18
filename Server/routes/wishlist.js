const express = require('express');
const wishlistRouter = express.Router();
const User = require('../models/UserModel');

wishlistRouter.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
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
        console.log(req.body.item);
        console.log(user);
        await user.wishlist.unshift(req.body.item);
        await user.save();
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
            const user = await User.findOneAndUpdate({'_id': req.params.id}, {'$pull': {'wishlist': {id: req.body.item.id}}})
            res.send(user);
        }
    }
    catch(err){
        console.log(err.message + '\n');
        res.send(err.message);
    }
})

module.exports = wishlistRouter;
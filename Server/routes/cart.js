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
    console.log('Post')
    try{
        const user = await User.findById(req.params.id);
        console.log(req.body.item);
        //console.log(user);
        await user.cart.push(req.body.item);
        await user.save();
        res.send('Success');
        return;
        }
        catch(err){
            console.log(err.message + '\n');
            res.send(err.message);
    }
})

cartRouter.put('/:id', async (req, res) => {
    try{
        debugger
        console.log(`Incrementing Quantity of ${req.params.id}\n`);
        console.log(req.params.id + '\n' + req.body.item.id + '\n')
        const user = await User.findOneAndUpdate({'_id': req.params.id, 'cart.id': req.body.item.id}, {'$inc': {'cart.$.quantity': 1}})
        console.log('Done');
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
    }
    catch(err){
        console.log(err.message + '\n');
        res.send(err.message);
    }
    
})

module.exports = cartRouter;
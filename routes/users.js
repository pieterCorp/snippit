const express = require('express');
const User = require('../models/user_model');
const router = express.Router();


//GET ALL USERS

router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);

    } catch (err) {
        res.status(500).json({ message : err.message});
    }
});

//GET  ONE USER

router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

//CREATE USER

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password
    });

    try{
    const newUser = await user.save();
    res.status(201).json(newUser);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});

//UPDATE USER

router.patch('/:id', getUser, async (req, res) => {
    if(req.body.name != null){
        res.user.name = req.body.name;
    }
    if(req.body.password != null){
        res.user.password = req.body.password;
    }
    try{
        const updatedUser = await res.user.save();
        res.status(200).json(updatedUser);

    } catch (err){
        res.status(400).json({ message: err.message});
    }

});

//DELETE USER

router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.remove();
        res.status(200).json({ message: 'User has been removed'});
    } catch (err){
        res.status(500).json({ message: err.message });
    }

});

//GET USER MIDDLEWARE

async function getUser(req, res, next) {
    let user;
    try{
        user =  await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}

module.exports = router;
const express = require('express');
const Snippit = require('../models/snippit_model');
const router = express.Router();


//GET ALL SNIPPITS

router.get('/', async (req, res) => {
    try{
        const snippits = await Snippit.find();
        res.json(snippits);

    } catch (err) {
        res.status(500).json({ message : err.message});
    }
});

//GET  ONE SNIPPIT

router.get('/:id', getSnippit, (req, res) => {
    res.json(res.snippit);
});

//CREATE SNIPPIT

router.post('/', async (req, res) => {
    const snippit = new Snippit({
        name: req.body.name,
        password: req.body.content
    });

    try{
    const newSnippit = await snippit.save();
    res.status(201).json(newSnippit);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});

//UPDATE SNIPPIT

router.patch('/:id', getSnippit, async (req, res) => {
    if(req.body.name != null){
        res.snippit.name = req.body.name;
    }
    if(req.body.content != null){
        res.snippit.content = req.body.content;
    }
    try{
        const updatedSnippit = await res.snippit.save();
        res.status(200).json(updatedSnippit);

    } catch (err){
        res.status(400).json({ message: err.message});
    }

});

//DELETE SNIPPIT

router.delete('/:id', getSnippit, async (req, res) => {
    try{
        await res.snippit.remove();
        res.status(200).json({ message: 'Snippit has been removed'});
    } catch (err){
        res.status(500).json({ message: err.message });
    }

});

//GET SNIPPIT MIDDLEWARE

async function getSnippit(req, res, next) {
    let snippit;
    try{
        snippit =  await Snippit.findById(req.params.id)
        if (snippit == null) {
            return res.status(404).json({ message: 'Cannot find snippit' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.snippit = snippit;
    next();
}

module.exports = router;
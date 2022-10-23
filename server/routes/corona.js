const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Corona = require('../models/corona');
const Users = require('../models/users');

// Getting all
router.get('/', async (req, res) => {
    try {
        const corona = await Corona.find()
        res.json(corona)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', async (req, res) => {
    try {
        const corona = await Corona.find({ "ID": req.params.id })
        res.status(200).json(corona)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// Creating one
router.post('/', async (req, res) => {
    try {
        const user = await Users.find({ "ID": req.body.ID })
        console.log(user)
        if (user) {
            console.log(req.body)

            const corona = new Corona(req.body)
            const newCorona = await corona.save()
            res.status(201).json(newCorona)
        }
        else {
            res.json({ msg: "no user" })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.put('/:id', async (req, res) => {
    try {
        const corona = await Corona.updateOne({ _id: req.params.id }, req.body)
        res.status(200).json({ message: 'User Updated' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', async (req, res) => {
    try {
        const corona = await Corona.remove({ _id: req.params.id })
        res.status(200).json({ message: `User _id:${corona} Deleted` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router;

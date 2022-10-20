const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Users = require('../models/users');

// Getting all
router.get('/', async (req, res) => {
  try {
    const users = await Users.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Creating one
router.post('/', async (req, res) => {
  try {
    const users = new Users(req.body)
    console.log(users)
    const newUsers = await users.save()
    res.status(201).json(newUsers)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.put('/:id', async (req, res) => {
  try {
    console.log(req.body)
    const user = await Users.updateOne({ _id: req.params.id }, req.body)
    res.status(200).json({ message: 'User Updated' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', async (req, res) => {
  try {
    const user = await Users.remove({ _id: req.params.id })
    res.status(200).json({ message: `User _id:${user} Deleted` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


module.exports = router;

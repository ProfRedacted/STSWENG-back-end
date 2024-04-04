const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrpyt = require('bcrypt')


router.post('/', async (req, res) => {
     const hashedPassword = await bcrpyt.hash(req.body.password, 10)
     const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
     })
     try {
          const newUser = await user.save()
          res.status(201).json(newUser)
     } catch (err) {
          res.status(400).json({message:  err.message})
     }
})

module.exports = router
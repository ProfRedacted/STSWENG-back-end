const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrpyt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
     if (!(req.body.name && req.body.password)) {
          return res.status(400).send("Not valid input")
     }
     const user = await User.findOne({name: req.body.name}).exec()
     if (user == null) {
          return res.status(400).send('Cannot find user')
     }
     try {
          if (await bcrpyt.compare(req.body.password, user.password)) {
               const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
               return res.status(201).json({token: "accessToken"})
          } else {
               return res.status(401).send('Failure')
          }
     } catch {
          return res.status(500)}
})

router.post('/register', async (req, res) => {
     if (!(req.body.name && req.body.email  && req.body.password)) {
               return res.status(400).send("Not valid input")
          }
     const salt = await bcrpyt.genSalt()

     try {
          
          const hashedPassword = await bcrpyt.hash(req.body.password, salt)
          const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
     })
          const newUser = await user.save()
          res.status(201).json(newUser)
     } catch (err) {
          res.status(400).json({message:  err.message})
     }
})

module.exports = router
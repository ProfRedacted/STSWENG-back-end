const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Token = require('../models/token')
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
               const userID = {id: user._id}
               const accessToken = generateAccessToken(userID)
               const refreshToken = jwt.sign(userID, process.env.REFRESH_TOKEN_SECRET)
               return res.status(201).json({accessToken: accessToken, refreshToken: refreshToken})
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


router.delete('/logout', async (req, res) => {
     try {
          const user = await Token.findOneAndDelete({refreshToken: req.body.refreshToken}).exec()
          if (user) {
               res.status(204)
          } else {
               res.status(400)
          }
     } catch {
          res.status(500)
     }

})

const generateAccessToken = (user) => {
     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'})
}


module.exports = router
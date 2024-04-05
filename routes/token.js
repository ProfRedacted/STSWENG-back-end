const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Token = require('../models/token')

router.post('/token', async (req, res) => {
     const refreshToken = req.body.token
     if (refreshToken == null) return res.sendStatus(401)
     const validToken = await Token.findOne({refreshToken: refreshToken})
     if (!validToken) return res.status(403)
     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) return res.sendStatus(403)
          const accessToken = generateAccessToken({user: user.id})
     })
})

const generateAccessToken = (user) => {
     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'})
}

module.exports = router
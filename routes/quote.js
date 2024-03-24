const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')

router.get('/', async (req, res) => {
     try {
          const quote = await Quote.find().limit(100).sort({createdAt: -1})
          res.status(200).json(quote)
     } catch (err) {
          res.status(500).json({message: err.message})
     }
})

router.post('/',async (req, res) => {
     const quote = new Quote({
          client: req.body.client,
          company: req.body.company,
          salesPerson: req.body.salesPerson,
          total: req.body.total,
          registerID: req.body.registerID
     })
     try {
          const newQuote = await quote.save()
          res.status(201).json(newQuote)
     } catch (err) {
          res.status(400).json({message:  err.message})
     }
})



module.exports = router
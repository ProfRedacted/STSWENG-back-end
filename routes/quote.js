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

router.post('/', async (req, res) => {
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
// uses automated generated id to put and deleted not the register ID
router.put('/:_id', async (req, res) => {
     const id = req.params._id
     const updatedQuota = {
          client: req.body.client,
          company: req.body.company,
          salesPerson: req.body.salesPerson,
          total: req.body.total,
          registerID: req.body.registerID
     }
     try {
          const updateQuota = await Quote.findByIdAndUpdate(id, updatedQuota)
          if (updateQuota != null) {
               res.status(200).json(id)
          } else {
               res.status(400).json({message: "Cannot find id"})
          }            
     } catch (err) {
          res.status(500).json({message: err})
     }
})

router.delete('/:_id', async (req, res) => {
     const id = req.params._id
     try {
          const deleteQuota = await Quote.findByIdAndDelete(id)
          if (deleteQuota != null) {
               res.status(200).json(deleteQuota)
          } else {
               res.status(400).json({message: "Cannot find id"})
          }
     } catch (err) {
          res.status(500).json({message: err})
     }
     
})



module.exports = router
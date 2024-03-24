const express = require('express')
const router = express.Router()
const Quote = require('../models/quota')

router.get('/', async (req, res) => {
     try {
          const quota = await Quota.find().limit(100).sort({createdAt: -1})
          res.status(200).json(quota)
     } catch (err) {
          res.status(500).json({message: err.message})
     }
})

router.post('/',async (req, res) => {
     const quota = new Quota({
          client: req.body.client,
          company: req.body.company,
          salesPerson: req.body.salesPerson,
          total: req.body.total,
          registerID: req.body.registerID
     })
     try {
          const newQuota = await quota.save()
          res.status(201).json(newQuota)
     } catch (err) {
          res.status(400).json({message:  err.message})
     }
})



module.exports = router
const express = require('express')
const router = express.Router()
const Material = require('../models/material')

router.get('/', async (req, res) => {
     try {
          const materials = await Material.find()
          res.status(200).json(materials)
     } catch (err) {
          res.status(500).json({message: err.message})
     }
})


router.post('/', async (req, res) => {
     const material = new Material({
          material: req.body.material,
          source: req.body.source,
          amount: req.body.amount,
          price: req.body.price
     })
     try {
          const newMaterial = await material.save()
          res.status(201).json(newMaterial)
     } catch (err) {
          res.status(400).json({message:  err.message})
     }
})



module.exports = router
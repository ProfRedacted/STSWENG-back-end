const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
     res.send("Hello")
})

router.post('/', (req, res) => {
     res.status(200)
})



module.exports = router
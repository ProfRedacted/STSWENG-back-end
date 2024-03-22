const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
     res.status(200).json({mama:'lmao'})
})

router.post('/',(req, res) => {
     
})



module.exports = router
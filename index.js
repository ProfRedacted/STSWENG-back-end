require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000

app.use(express.json())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.listen(PORT,
     () => {
          console.log(PORT)
          console.log("Web Server is working")
     }
)

const mainRouter = require('./routes/main')
const materialRouter = require('./routes/material')

app.use('/', mainRouter)
app.use('/materials', materialRouter)


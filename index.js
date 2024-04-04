require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bcrpyt = require('bcrypt')

const mainRouter = require('./routes/main')
const materialRouter = require('./routes/material')
const quoteRouter = require('./routes/quote')
const userRouter = require('./routes/user')

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors({ origin: process.env.FRONTEND_URL}))


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.listen(PORT,
     () => {
          console.log("Server is running on port " + PORT);
     }
)


app.use('/', mainRouter)
app.use('/material', materialRouter)
app.use('/quote', quoteRouter)
app.use('/register', userRouter)


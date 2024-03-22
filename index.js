const express = require('express')

const app = express()

app.use(express.json())

app.listen(3000,
     () => console.log("Web Server is working")
)

const mainRouter = require('./routes/main')
const materialRouter = require('./routes/material')

app.use('/', mainRouter)
app.use('/materials', materialRouter)


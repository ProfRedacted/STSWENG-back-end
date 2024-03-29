const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
     createdAt: {
          type: Date,
          require: true,
          default: Date.now
     }, 
     client: {
          type: String,
          require: true
     },
     company: {
          type: String,
          require: true
     },
     salesPerson: {
          type: String,
          require: true
     },
     total: {
          type:  Number,
          require: true,
          integer: true,
          validate : {
               validator : Number.isInteger,
               message   : 'Value is not an integer value'
          }
     },
     registerID: {
          type: String,
          require: true
     }

})
module.exports = mongoose.model('quote',quoteSchema)
const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
     material: {
          type: String,
          require: true
     },
     source: {
          type: String,
          require: true
     },
     amount: {
          type:  Number,
          require: true,
          integer: true,
          validate : {
               validator : Number.isInteger,
               message   : 'Value is not an integer value'
          }
     },
     price: {
          type: Number,
          require: true
     },
     createdAt: {
          type: Date,
          require: true,
          default: Date.now
     }

})
module.exports = mongoose.model('material',materialSchema)
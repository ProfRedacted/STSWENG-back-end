
const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
     accessToken: {
          type: Date,
          require: true,
          default: Date.now
     }, 
     refreshToken: {
          type: String,
          require: true
     }

})
module.exports = mongoose.model('token',tokenSchema)
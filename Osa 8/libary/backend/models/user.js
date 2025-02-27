const mongoose = require('mongoose')

// Tämä vaatii mongoose 7 version, ei uudempaa/vanhempaa
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    username: {    
        type: String,
        minlenght: [3, "Username must be at least 3 characters long"],    
        required: [true, "Username required"],    
        unique: true
      },
      favoriteGenre: {
        type: String,
      }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)
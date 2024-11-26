const mongoose = require('mongoose')

// Tämä vaatii mongoose 7 version, ei uudempaa/vanhempaa
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

schema.plugin(uniqueValidator)


module.exports = mongoose.model('Author', schema)
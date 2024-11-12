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

schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Author', schema)
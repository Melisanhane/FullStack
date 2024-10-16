const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {    
    type: String,
    minlenght: [3, "Username must be at least 3 characters long"],    
    required: [true, "Username required"],    
    unique: true
  },
  name: {
    type: String,
    required: [true, "Name required."]
  },
  passwordHash: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
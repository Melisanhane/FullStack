const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()     
const User = require('../models/user')

usersRouter.get('/', async(request, response) => {
  const users = await User
    .find({}).populate("blogs", {title: 1, author: 1, url: 1, likes: 1})
    console.log(users)
    response.json(users)
})

usersRouter.post("/", async (request, response) => {
  const {username, name, password} = request.body

  if (!password) { 
    return response.status(400).json({error: "Error: password is missing."}) 
  }
  if (password.length < 3) { 
    return response.status(400).json({error: "Error: password is too short (must be at least 3 characters)."}) 
  }
  if (username.length < 3) {
    return response.status(400).json({error: "Error: username is too short (must be at least 3 characters)."}) 
  }

  const existingUser = await User.findOne({username})
  if(existingUser){
    return response.status(400).json({error: "Error: username must be unique."})
  }

  const saltRounds = 10 
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
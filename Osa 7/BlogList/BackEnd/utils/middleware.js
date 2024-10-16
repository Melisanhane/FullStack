const logger = require('./logger')
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const userExtractor = async (request, response, next) => {

  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ", "")) {
    request.token = authorization.replace("Bearer ", "");

    const user = jwt.verify(request.token, process.env.SECRET);
    request.user = user;
  } 
  else {
    request.token = null;
    request.user = null;
  }
  next();
}

const tokenExtractor = async (request, response, next) => {
  const auth = await request.get("authorization")
	if(auth && auth.toLowerCase().startsWith("bearer")){
		request.token = auth.substring(7)
	}
  next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }
 else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })  
  }
  next(error)
}
  
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
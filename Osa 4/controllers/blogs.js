const blogsRouter = require('express').Router()
const middleware = require("../utils/middleware")
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate("user", {username: 1, name: 1})
    console.log(blogs)
    response.json(blogs)
})

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => { 
    const body = request.body
    const user = request.user

    if (!user) {
      return response.status(400).send({ error: "User not found" });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
        likes: body.likes || 0
    })
    if (!body.title || !body.url) {
        response.status(400).end()
    }
    else {
        const savedBlog = await blog.save()
        await user.save()
        response.status(201).json(savedBlog)
    } 
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body
  console.log(body)
  const user = request.user

  if ( !user ) {
		return response.status(401).json({ error: "Error: token is invalid or missing." })
	}

  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() !== request.user.id.toString() ) {
		return response.status(401).json({ error: "Error: Unathorized token." })
	}

  await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const originalBlog = await Blog.findById(request.params.id)

    const blog = {
      ...response.json(originalBlog),
      likes: body.likes,
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })
    response.status(200).json(updatedBlog)
/*
  // vaihtoehtoinen mutta ei toimi
  try {
    const updatedBlog = await 
      Blog.findByIdAndUpdate(request.params.id, request.body, {new: true,})
    response.status(200).json(updatedBlog)
  }
  catch (error) {
    response.status(500).send(error)
  }
*/
  })

module.exports = blogsRouter

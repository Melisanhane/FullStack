const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const middleware = require("../utils/middleware")
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate("user", {username: 1, name: 1}).populate("comments", {content: 1})
    console.log(blogs)
    response.json(blogs)
})

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => { 
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const user = await User.findById(decodedToken.id)

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
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
  } 
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user = request.user
  if ( user.id.toString() !== decodedToken.id) {
		return response.status(401).json({ error: "Error: Unathorized token." })
	}

  await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, 
      {title, author, url, likes}, 
      {new: true,}
    )
    response.status(200).json(updatedBlog)
  })

blogsRouter.post('/:id/comments', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const blogId = request.params.id
  const body = request.body
  
  const blog = await Blog.findById(blogId)
  if (!blog) {
    response.status(404).json({ error: 'Blog not found' })
  }

  const comment = new Comment({
      content: body.content,
      blog: blog.id,
  })
  console.log(comment, 'tämä on kommentti') 

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment)
})

module.exports = blogsRouter
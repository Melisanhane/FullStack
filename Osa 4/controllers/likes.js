// Tarvitseeko tätä tänne??

const router = require('express').Router()
const Blog = require('../models/blog')

router.put('/:id', async (request, response) => {
    let blog = await Blog.findById(request.params.id)
    blog.likes++
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})

module.exports = router
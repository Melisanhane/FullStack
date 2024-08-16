// CREATE NEW BLOG
import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'

// BLOGFORM || Heittää error 500 mutta toimii
const BlogForm = (props) => {

  const [notification, setNotification] = useState(null)

  const [newBlog, setNewBlog] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  // ADD BLOG || tätä muokattava että palattaisiin APP
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newBlogAuthor,
      url: newBlogUrl,
      date: new Date().toISOString(),
    //  important: Math.random() > 0.5,
    }
    blogService.create(blogObject).then(returnedBlog => {
    //  setBlogs(blogs.concat(returnedBlog))
      setNotification('add')
    })

    setTimeout(() => {
      setNotification(null)
    }, 5000)

    console.log(blogObject)
    setNewBlog('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <p>Title: <input value={newBlog} onChange={handleBlogChange}/></p>
        <p>Author: <input value={newBlogAuthor} onChange={handleAuthorChange}/></p>
        <p>url: <input value={newBlogUrl} onChange={handleUrlChange}/></p>
        <button type="submit">create</button>
      </form>
      <br/>
    </div>
  )
}
export default BlogForm
/*
jos props.addBlog, refreshaa sivun
          <form onSubmit={props.addBlog}>
 ReFreshaa kun täällä
          <button type="submit" onClick={() => setNewBlogVisible(false)}>create</button>
 */
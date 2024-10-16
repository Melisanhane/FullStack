import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'

const BlogForm = (props) => {

  const [notification, setNotification] = useState(null)

  const [newBlog, setNewBlog] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newBlogAuthor,
      url: newBlogUrl,
      date: new Date().toISOString(),
    }
    blogService.create(blogObject).then(
      setNotification('add')
    )

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
    <Notification notification={notification}/>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <p>Title: <input value={newBlog} onChange={handleBlogChange} placeholder='give a title'/></p>
        <p>Author: <input value={newBlogAuthor} onChange={handleAuthorChange} placeholder='give a author'/></p>
        <p>url: <input value={newBlogUrl} onChange={handleUrlChange} placeholder='give a url'/></p>
        <button type="submit">create</button>
      </form>
      <br/>
    </div>
  )
}
export default BlogForm
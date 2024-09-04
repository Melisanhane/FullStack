import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'
import '../style.css'

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [visible, setVisible] = useState(false)
  const [notification, setNotification] = useState(null)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (id, newObject) => {
    const newBlog = blogs.find((newBlog) => newBlog.id === blog.id)
    newBlog.likes += 1
    blogService.update(blog.id, newBlog)
    setNotification('update')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const RemoveBtn = (blog) => {
    const username = user.name
    const author = blog.blog.author
    if (username === author) {
      return (
        <button onClick={() => removeBlog(blog.id, user)} className="remove">remove</button>
      )
    }
  }   
  
  const removeBlog = () => {
    console.log(user)
    console.log(blog.id)
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id, user)
      setNotification('remove')
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
    <Notification notification={notification}/>
    <div className="blogBox">
      <div style={hideWhenVisible}>
        {blog.title}<button onClick={toggleVisibility} className='visibility'>view</button>
      </div>
      <div style={showWhenVisible} className="blogBoxInfo">
        {blog.title}<button onClick={toggleVisibility} className='visibility'>hide</button>
        <br/>
        {blog.author}
        <br/>
        Likes {blog.likes}<button onClick={() => addLike(blog.id, blog)} className="like">like</button>
        <br/>
        {blog.url}
        <br/>
        <RemoveBtn blog={blog} />
      </div>
    </div>
    </div>
  )
}

export default Blog
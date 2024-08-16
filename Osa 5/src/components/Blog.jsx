// BLOGILISTAUS
import { useState } from 'react'
import blogService from '../services/blogs'
// import Notification from '../components/Notification'
// import likeService from '../services/likes'
import '../style.css'

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Pitäidi toimia oikein mutta ei toimi
  const addLike = (id, newObject) => {
    console.log(blog.id)
    console.log(newObject.likes+1)
    blogService.update(id, newObject.likes+1)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        console.log('blogi liketetty')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const removeBlog = (id, user) => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(id, user)
    }
  }

  return (
    <div className="blogBox">
      <div style={hideWhenVisible}>
        {blog.title}<button onClick={toggleVisibility} className='visibility'>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}<button onClick={toggleVisibility} className='visibility'>hide</button>
        <br/>
        {blog.author}
        <br/>
        Likes {blog.likes}<button onClick={() => addLike(blog.id, blog)} className="like">like</button>
        <br/>
        {blog.url}
        <br/>
        <button onClick={() => removeBlog(blog.id, user)} className="remove">remove</button>
      </div>
    </div>
  )
}

export default Blog
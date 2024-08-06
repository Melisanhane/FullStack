// BLOGILISTAUS

import {useState} from 'react'
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

// 404 Not Found
  const addLike = (id, newObject) => {
    debugger
    console.log(blog.id)
    blogService.update(id, newObject)
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

  // SORT BLOGS ON LIKES || Toimii mutta pitäisi saada vietyä oikeaan paikkaan eli blog
    const sortedBlogs = blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    console.log(sortedBlogs)

  return (
    <div className="blogBox">
      <div style={hideWhenVisible}>
        {blog.title}<button onClick={toggleVisibility} className='visibility'>view </button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title}<button onClick={toggleVisibility} className='visibility'>hide</button>
        </div>
        {blog.author}
        <div>
          likes {blog.likes}<button onClick={() => addLike(blog.id, blog)} className="like">like</button>
        </div>
        {blog.url}
        <br/>
        <button onClick={() => removeBlog(blog.id, user)} className="remove">remove</button>
      </div>
    </div>  
)
}

export default Blog
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './style.css'

const App = () => {
  const blogFormRef = useRef()
  const [showAll, setShowAll] = useState(true)
  const [blogs, setBlogs] = useState([])

  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Logged user first page and save user to localstore
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // then get blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem( 'loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }

    catch (exception) {
      setNotification('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setNotification(null)
  }

  // LOG SITE
  const loginForm = () => (
    <div className="container">
      <h2>log in to application</h2>
      <Notification notification={notification}/>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" data-testid='username' value={username} name="Username" onChange={({ target }) =>
            setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type="password" data-testid='password' value={password} name="Password" onChange={({ target }) =>
            setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div className="container">
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>
        <Notification notification={notification}/>
        <h2>blogs</h2>
        <ul>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user}/>
          )}
        </ul>
        <Togglable buttonlabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>}
    </div>
  )
}
export default App

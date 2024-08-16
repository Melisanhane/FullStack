import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
// import LoginForm from './components/LoginForm'
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

  // kirjautuneen käyttäjän ekan sivun lataus ja käyttäjän tallennus localstorageen
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Tämä suoritetaan kun käyttäjä löytyy eli on kirjautunut sisään || kerää blogit talteen
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const addBlog = (blogObject) => {
  //  event.preventDefault()
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNotification('blog-added')
    })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem( 'loggedBlogappUser', JSON.stringify(user)) // tokenin tallentaminen local storagen avulla
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

  // LOG SITE || Tämän voi halutessaan siirtää omaan komponenttiin ja tehdä ProTypet
  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification}/>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={({ target }) =>
            setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type="password" value={password} name="Password" onChange={({ target }) =>
            setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>

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
// {!user && loginForm()} <-- jos user on Falsy, eli ei ole, ei suoriteta {user && blogForm()}
export default App

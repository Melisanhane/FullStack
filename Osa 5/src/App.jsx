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
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNotification('blog-added')
    })

setTimeout(() => {
  setNotification(null)    
}, 5000)
  }

// TAPAHTUMAKÄSITTELIJÄT ----------------------------------------------------
  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }
  const handleLogin = async (event) => {    
    event.preventDefault()
    console.log('logging in with', username)    
    try {      
      const user = await loginService.login({username, password,})
      window.localStorage.setItem( 'loggedBlogappUser', JSON.stringify(user)) // tokenin tallentaminen local storagen avulla
      blogService.setToken(user.token)
      setUser(user)      
      setUsername('')      
      setPassword('')   
    } 
    catch (exception) {
      setNotification('user not found')      
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
// --------------------------------------------------------------------------

// LOG SITE
  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification}/>
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input type="text" value={username} name="Username" onChange={({ target }) => 
            setUsername(target.value)}/>
        </div>
        <div>
          password{" "}
            <input type="password" value={password} name="Password" onChange={({ target }) => 
              setPassword(target.value)}/>
        </div>
      <button type="submit">login</button>
      </form>
    </div>      
  )

  /*
// USER BLOGS
  const blogForm = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor, 
      url: newBlogUrl
    }

    blogService.create()

    /*
    // Tämä toimiii ja näyttää kaikki, vaatii () || löytyy jo returnista
    <ul>
    {blogs.map(blog => 
      <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user}/>
      )}
    </ul>
  */
 // Tähän pitää saada joku lisäys siten, että lisää title ja author
/*    blogs.forEach(blog => {
      let title = []
      if (blog.author === user) {
        console.log(blog.title, blog.author)
        const author = blog.author
        title.push(blog.title)
      }        
      console.log(title)
    })
    /*
    return (
      <ul>
        {title.map(blogs =>{
          {blogs} {author}
        })}
      </ul>
    )
      
}
*/
  
  return (
    <div>
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>

        <h2>blogs</h2>
        <ul>
          {blogs.map(blog => 
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
/*

// <h2> blogs <h2> jälkeen
{blogForm(user.name)}



rivi 136 alkaen, {blogForm()} </div> jälkeen
      <ul>
        {blogsToShow.map(blog => 
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>


<div>
       <p>{user.name} logged in <button type="submit" onClick={logOut}>logout</button></p>

         <h2>blogs</h2>
         {blogForm(user.name)}
      </div>}     
*/
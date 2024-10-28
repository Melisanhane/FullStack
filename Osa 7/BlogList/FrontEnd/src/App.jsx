import { useState, useEffect, useRef, useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BrowserRouter as 
  Router, Routes, Route, Link,
  useNavigate,
  useParams
} from 'react-router-dom'

import Blog from './components/Blog'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Menu from './components/Menu'

import { useNotificationDispatch } from './NotificationContext'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import './style.css'
import { Table, Form, Button } from 'react-bootstrap'

 
const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
 
  const blogFormRef = useRef()  // määrittelee blogien näkyvyyden
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const loggingMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  }) 

  const tokenMutation = useMutation({
    mutationFn: blogService.setToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      tokenMutation.mutate(user.token)
    }
  }, [])
 
// -------------------- START --------------------
  const blogResult = useQuery({    
    queryKey: ['blogs'],    
    queryFn: blogService.getAll,
    retry: false,
  })
//  console.log(JSON.parse(JSON.stringify(blogResult)))
  if ( blogResult.isLoading ) {
    return <div>loading data...</div>  
  }
  if ( blogResult.isError ) {
    return <div>blog service not available due to problems in server</div>
  }
  const blogs = blogResult.data
  
  const userResult = useQuery({    
    queryKey: ['users'],    
    queryFn: userService.getAll,
    retry: false,
  })
//  console.log(JSON.parse(JSON.stringify(userResult)))
  if ( userResult.isLoading ) {
    return <div>loading data...</div>  
  }
  if ( userResult.isError ) {
    return <div>users service not available due to problems in server</div>
  }
  const users = userResult.data
// ------------------- START END --------------------
 
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username)
    try {
      const user = await loggingMutation.mutateAsync({ username, password})
      window.localStorage.setItem( 'loggedBlogappUser', JSON.stringify(user))
      tokenMutation.mutate(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch({
        type: 'SHOW',
        payload: `Welcome ${user.name}`
      }),
      setTimeout(()=>{
        dispatch({type: 'HIDE'})
      },5000)
    }
    catch (exception) {
      console.log('error')
      dispatch({
        type: 'SHOW',
        payload: `wrong username or password`
      }),
      setTimeout(()=>{
        dispatch({type: 'HIDE'})
      },5000)
    }
  }
  
  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }
 
  // LOG SITE
  const loginForm = () => (
    <div className="container">
      <h2>log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" data-testid='username' name="username" value={username} onChange={({ target }) =>
            setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" data-testid='password' value={password} name="Password" onChange={({ target }) =>
            setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">login</Button>
      </Form>
    </div>
  )
  
  return ( 
    <div className="container">
      {!user && loginForm()}
      {user && <Router>
        <div>
          <Menu />
          <p>{user.name} logged in <Button  className="Btn" onClick={handleLogOut}>log out</Button></p>
          <Notification />
          <Routes>
            <Route path="/users/:id" element={<User showUser={users} />} />
            <Route path="/blogs/:id" element={<Blog showBlog={blogs} user={user} />} />
            <Route path="/" element={<div>
              <h2>Blogs</h2>
              <table>
                <tbody>
                  {blogs.map(blog =><tr>
                    <td><Blog key={blog.id} blog={blog} blogs={blogs} user={user} /></td>
                  </tr> )} 
                </tbody>
              </table>
              <Togglable buttonlabel="create new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog}/>
              </Togglable>
            </div>} />
            <Route path="/users" element={<div>
              <h2>Users</h2>
              <table>
                <tbody>
                  {users.map(user =><tr>
                    <td><User key={user.id} user={user} /></td>
                  </tr>)}
                </tbody>
              </table>
            </div> } />
          </Routes>
        </div>
      </Router> }
    </div>
  )
}
export default App 
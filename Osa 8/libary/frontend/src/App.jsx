import { useState, useEffect } from 'react'
import { useApolloClient } from "@apollo/client"
import { BrowserRouter as 
  Router, Routes, Route, Link,
  useNavigate,
  useParams
} from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './style.css'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('library-user-token')
    if (loggedUserJSON) {
      setToken(loggedUserJSON)
    }
  }, [])

  const notify = (message) => {
    console.log(message)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <div>
        <LoginForm setToken={setToken} setError={notify}/>
        <Notification errorMessage={errorMessage} />
      </div>

    )
    //                  <Notify errorMessage={notify} />
    //           setError={notify}
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
    /*
    return (
          <LoginForm setToken={setToken} />
    )
          */
  }

  return (
      <div>
        <div>
          <Link className="menu" to="/authors">authors</Link>
          <Link className="menu" to="/books">books</Link>
          <Link className="menu" to="/addbook">add book</Link>
          {token && (
          <Link className="menu" to="/" onClick={logout}>LOGOUT</Link>
        )}
        </div>
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/addbook" element={<NewBook />} />
          <Route path="/" element={<LoginForm setToken={setToken} />} />
        </Routes>
      </div>
  )
}

export default App
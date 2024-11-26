import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { BrowserRouter as 
  Router, Routes, Route, Link,
  useNavigate,
  useParams
} from 'react-router-dom'
import '../style.css'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('libary-user-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    navigate('/authors')
  }

  return (
    <div className="content">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div className="inputField">
          username:
          <br />
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div className="inputField">
          password:
          <br /> 
          <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
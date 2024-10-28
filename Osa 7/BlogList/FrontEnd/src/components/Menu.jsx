import {
    BrowserRouter as 
    Router, Routes, Route, Link
  } from 'react-router-dom'
import '../style.css'

const Menu = () => {
    return (
        <div>
          <Link to="/" className="nav">BLOGS</Link>
          <Link to="users" className="nav">USERS</Link>
        </div>
    )
  }

  export default Menu
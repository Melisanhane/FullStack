import { BrowserRouter as 
    Router, Routes, Route, Link,
    useParams
  } from 'react-router-dom'
import '../style.css'

const User = ({ user, showUser }) => {
    if (showUser) {
        const id = useParams().id
        const user = showUser.find(n => n.id === id)
        console.log(user.name)
        return (
          <div className="blogBoxInfo">
            <h3>{user.name}</h3>
            <br/>
            <h5>added blogs:</h5>
            {user.blogs.map(blog => <div>
                <Link to={`/blogs/${blog.id}`} className="blogBox">{blog.title}</Link>
            </div>)}
        </div>
        )
    }
    
    if (!user) {
        return null  
    }

    return (
        <div>
            <Link to={`/users/${user.id}`} className="blogBox">{user.name}</Link>
            <p className="usersView">Blogs added: {user.blogs.length} </p>
        </div>

    )
  }

  export default User
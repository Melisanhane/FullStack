import {useState} from 'react'

// TEKEE REFRESH EIKÄ TOIMI
const BlogForm = (props) => {

  const [newBlog, setNewBlog] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  // ADD BLOG
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newBlogAuthor,
      url: newBlogUrl,
      date: new Date().toISOString(),
    //  important: Math.random() > 0.5,
    }
    setNewBlog('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
}


  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={props.addBlog}>
          <p>Title: <input value={props.newBlog} onChange={props.handleBlogChange}/></p>
          <p>Author: <input value={props.newBlogAuthor} onChange={props.handleAuthorChange}/></p>
          <p>url: <input value={props.newBlogUrl} onChange={props.handleUrlChange}/></p>
          <button type="submit">create</button>
        </form>
        <br/>
      </div>
  )
}
 export default BlogForm
 /*
jos props.addBlog, refreshaa sivun 
          <form onSubmit={props.addBlog}>
 ReFreshaa kun täällä  
          <button type="submit" onClick={() => setNewBlogVisible(false)}>create</button>
 */
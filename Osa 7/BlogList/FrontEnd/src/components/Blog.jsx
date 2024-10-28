import { useState } from 'react'
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { BrowserRouter as 
  Router, Routes, Route, Link,
  useNavigate, useParams
} from 'react-router-dom'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'
import { Form, Button } from 'react-bootstrap'
import '../style.css'

const Blog = ({ blog, blogs, user, showBlog }) => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const navigate = useNavigate()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })
  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })
  const commentBlogMutation = useMutation({
    mutationFn: blogService.comment, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    }
  })
 
// ---------------- ONE BLOG SHOW START ----------------------------
  if (showBlog) {
    const id = useParams().id
    const [newComment, setNewComment] = useState('')
    const blog = showBlog.find(n => n.id === id)

    const addLike = async () => {
      const newBlog = showBlog.find((newBlog) => newBlog.id === blog.id)
      console.log(newBlog)
      newBlog.likes += 1
      updateBlogMutation.mutate(newBlog)
      await dispatch({
        type: 'SHOW',
        payload: `blog liked`
      }), 
      setTimeout(()=>{
        dispatch({type: 'HIDE'})
      },5000)
    }

    const RemoveBtn = (blog) => {
      const username = user.name
      const author = blog.blog.author
      if (username === author) {
        return (
          <Button onClick={() => removeBlog(blog.id, user)} className="remove">remove</Button>
        )
      }
    } 
  
  const removeBlog = () => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlogMutation.mutate({ blog, user})
      dispatch({
        type: 'SHOW',
        payload: `blog removed`
      }),
      setTimeout(()=>{
        dispatch({type: 'HIDE'})
      },5000)
      navigate('/')
    }
  } 

  const addComment = async (event) => {
    event.preventDefault()
    const blogObject = {
      ...blog,
      content: newComment
    } 
    commentBlogMutation.mutate( blogObject)
    await dispatch({
      type: 'SHOW',
      payload: `comment added`
    }),
    setTimeout(()=>{
      dispatch({type: 'HIDE'})
    },5000)
    setNewComment('')
  }

    return (
      <div>
        <div>
          <h3>{blog.title}</h3>
          {blog.author}
          <br/>
          {blog.url}
          <br/>
          Likes {blog.likes}<button onClick={() => addLike(blog)} className="like">like</button>
          <br/>
          <RemoveBtn blog={blog} />
        </div>
        <div>
          <br/>
          <h4>comments</h4>
          <Form onSubmit={addComment}>
            <Form.Group>
              <Form.Control type='text' name='comment' value={newComment} placeholder='give a comment' onChange={({ target }) =>
                setNewComment(target.value)} 
              />
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit" className="Btn">create</Button>
          </Form>
          <div>
            <ul>{blog.comments.map(comment => 
              <li key={comment.id}>{comment.content}</li>
            )}</ul>
          </div>
        </div>
    </div>
    ) 
  }
// --------------- ONE BLOG SHOW END --------------------

  return (
    <div>
      <Link to={`/blogs/${blog.id}`} className="blogBox">{blog.title}</Link>
      <br/><br/>
    </div>
  )
}

export default Blog
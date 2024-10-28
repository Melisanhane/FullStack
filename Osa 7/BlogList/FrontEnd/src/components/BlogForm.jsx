import { useState, useReducer } from 'react'
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'
import { Button } from 'react-bootstrap'

const BlogForm = (props) => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const [newBlog, setNewBlog] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })
 
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newBlogAuthor,
      url: newBlogUrl,
      date: new Date().toISOString(),
      id: (100000 * Math.random()).toFixed(0),
      likes: 0
    }
    newBlogMutation.mutate( blogObject )   
    await dispatch({
        type: 'SHOW',
        payload: `new blog created`
      }),
      setTimeout(()=>{
        dispatch({type: 'HIDE'})
      },5000)
  
    console.log(blogObject)
    setNewBlog('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <p>Title: <input value={newBlog} name='title' onChange={handleBlogChange} placeholder='give a title'/></p>
        <p>Author: <input value={newBlogAuthor} name='author' onChange={handleAuthorChange} placeholder='give a author'/></p>
        <p>url: <input value={newBlogUrl} name='url' onChange={handleUrlChange} placeholder='give a url'/></p>
        <Button type="submit" className="Btn">create</Button>
      </form>
      <br/>
    </div>
  )
}
export default BlogForm
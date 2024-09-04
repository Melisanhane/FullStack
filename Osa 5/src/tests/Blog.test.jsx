import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import { describe } from 'vitest'

describe('<Blog /> tests', () => {
  const mockHandler = vi.fn()

  let container 
    beforeEach(() => {
      container = render(
        <button > view
          <div className="blogBoxInfo" >
            togglable content
          </div>
        </button>
      ).container
    })


test('renders title and author', () => {
    const blog = {    
    title: 'title OK',
    author: 'author OK',
    important: true
  }
  render(<Blog blog={blog} />)
  screen.getByText('title OK', 'author OK')

})

  test('when click view button', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText("view")
    await user.click(viewButton)

    const url = screen.queryByText("url OK")
    expect(url).toBeDefined()
    const likes = screen.queryByText("likes OK")
    expect(likes).toBeDefined()
  })
  
  test('Likes click twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText("view")
    await user.click(viewButton)

    const likeBtn = container.querySelector(".like")
    await user.click(likeBtn)
    await user.click(likeBtn)

    const counterTxt = screen.queryByText("LikeBtn click 2 times")
    expect(counterTxt).toBeDefined()
  })
})

describe('<BlogForm /> tests', () => {
  test('new blog created correctly', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render (<BlogForm createBlog={createBlog} />)
    
    const titleInput = screen.getByPlaceholderText('give a title')
    const authorInput = screen.getByPlaceholderText('give a author')
    const urlInput = screen.getByPlaceholderText('give a url')
    
    const sendBtn = screen.getByText('create')
    screen.debug(sendBtn)

    await user.type(titleInput, 'Testing title...')
    await user.type(authorInput, 'Testing author...')
    await user.type(urlInput, 'Testing url...')

    await user.click(sendBtn)

    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls[0][1]).toBe('Testing title...')
    expect(createBlog.mock.calls[0][0].author).toBe('Testing author...')
    expect(createBlog.mock.calls[0][0].url).toBe('Testing url...')
  })
})
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        id: "6672b012f0a914db4591fca8",
        title: "KissaStaffeja",
        author: "Erkki Mattila",
        url: "www.random.fi",
        likes: 10,
        _v: 0
    },
    {
        _id: "6660128e23259ebf1aaf8119",
        title: "Vauvajuttuja",
        author: "Matti Erkkilä",
        url: "www.joku.fi",
        likes: 5,
        _v: 0
    }
  ]

  const initialUsers = [
    {
      username: 'TaiMi',
      name: 'Taija Mitronen',
      password: '5555',
    },
    {
      username: 'NiNim',
      name: 'Niko Nummela',
      password: 'secretti',
    },
    {
      username: "PauNu",
      name: "Pauli Nummela",
      password: "6666"
    }
  ]

const nonExistingId = async () => {
  const blog = new Blog({title: "toBeRemoved", author:"toBeRemoved", url: "toBeRemoved.com"})
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
  
module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
}

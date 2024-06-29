// ----- APURI TSEKKAAMAAN MIHIN TILAAN TIETOKANTA PÄÄTYY -----
const Blog = require('../models/blog')
const User = require('../models/user')

// Alustettava sisältö, täytyy määritellä käsin MongoDBstä
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

// Varmuuden vuoksi määritellään funktio nonExistingId joka luo tietokanta-id:n joka ei kulu millekkään kannassa olevalle oliolle
const nonExistingId = async () => {
  const blog = new Blog({title: "toBeRemoved", author:"toBeRemoved", url: "toBeRemoved.com"})
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()    // TÄMÄ PITÄÄ VARMAAN MUUTTAA PERUS ID:KSI
}

// Tietokannan tilan tarkistus Usereilta
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

// BlogsInDb tarkastaa sovelluksen tietokannassa olevat blogit eli Mongosta
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

const { test, describe,  after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')  
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

let res
let addUser

beforeEach(async () => {
  // Poistetaan taulukot
  await User.deleteMany({});
  await Blog.deleteMany({});

  /*
  // Lisätään testikäyttäjä <<  POISTAA MUUT KÄYTTÄJÄT
  const user = {
    username: "testiPate",
    name: "Pate Testaaja",
    password: "testiPassi",
  };
  addUser = await api.post("/api/users").send(user);

  res = await api
    .post("/api/login")
    .send({ username: "testiPate", password: "testiPassi" });

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${res._body.token}`)
    .send({
      title: "Testi Blogi",
      author: addUser._body.id,
      url: "www.testinkiosoite.com",
      likes: 1,
    });
    */
});

describe('Blogs test', () => {  
    test('blogs are returned as json', async () => {
        console.log('entered test')
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blogs have ID', async () => {
        const blog = await helper.blogsInDb() 
        assert.strictEqual(blog.id, blog._id)
    })

//      Error: expected 201 "Created", got 500 "Internal Server Error"
    test('new blog can be added and saved in MongoDB ', async () => {
        const newBlog = {
            title: "TestiTesti BlogiBlogi",
            url: "www.BlogTest.fi",
            likes: 2
        }
  
        await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${res._body.token}`)
            .send({ ...newBlog, author: addUser._body.id })
            .expect(201)
            .expect('Content-Type', /application\/json/)
  
        const blogAfterPost = await helper.blogsInDb()
        assert.strictEqual(blogAfterPost.length, helper.initialBlogs.length + 1)
        const title = blogAfterPost.map(data => data.title)
        assert(title.includes("TestiTesti BlogiBlogi"));
    })

  //     Error: expected 201 "Created", got 500 "Internal Server Error"
    test('blog no likes', async () => {
        const newBlog = {
            title: "No Likes :(",
            url: "www.niiskista.fi",
        }
        await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${res._body.token}`)
            .send({ ...newBlog, author: addUser._body.id })
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogAfterPost = await helper.blogsInDb()
        assert("likes" in blogAfterPost[1]);
    })

    test('blog without title/url is not added', async () => {
        const newBlog = {
            title: "No titteli",
        //    url: "www.NoURL.fi",
            likes: 2
        }
    
        await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${res._body.token}`)
            .send({ ...newBlog, author: addUser._body.id })
            .expect(400)
    })

//      Error: expected 204 "No Content", got 500 "Internal Server Error""  || Koska useria ei löydy 
  test('Delete blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${res._body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test('Blogs can be update', async () => {
    const blogsInDB = await helper.blogsInDb()
    const id = blogsInDB[0].id
    
    const update = {
      title: "Testi Blogi",
      url: "www.testinkiosoite.com",
      likes: 11,
    };

    await api
      .put(`/api/blogs/${id}`)
      .send(update)
      .expect(200)

    const newUpdate = await helper.blogsInDb()
    assert.strictEqual(update.likes, newUpdate[0].likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})
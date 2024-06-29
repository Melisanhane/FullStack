// SUPERTEST
const { test, describe,  after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')  // importtaa express sovelluksen
const helper = require('./test_helper')  // importataan apuri
const api = supertest(app)  // Kääritään sovellus ns. superagent-olioksi (pieni progressiivinen asiakaspuolen HTTP-pyyntökirjasto)
const bcrypt = require('bcrypt')        // algoritmin tuonti salasanojen määrittämiseen/käsittelyyn tietokantaan
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
            .get('/api/blogs')  // tehdään pyyntö osoitteeseen
            .expect(200)        // varmistetaan toivottu vastaus
            .expect('Content-Type', /application\/json/)    // varmistetaan toivottu palautusmuoto 
    })

    test('blogs have ID', async () => {
        const blog = await helper.blogsInDb() 
        assert.strictEqual(blog.id, blog._id)
    })

//      Error: expected 201 "Created", got 500 "Internal Server Error"
    test('new blog can be added and saved in MongoDB ', async () => {
        // Luodaan testi blogi
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
  
        const blogAfterPost = await helper.blogsInDb()    // Tarkistetaan mihin tilaan tietokanta on päätynyt
        assert.strictEqual(blogAfterPost.length, helper.initialBlogs.length + 1)
        // Tarkistetaan tuliko testiBlogi
        const title = blogAfterPost.map(data => data.title)
        assert(title.includes("TestiTesti BlogiBlogi"));
    })

  //     Error: expected 201 "Created", got 500 "Internal Server Error"
    test('blog no likes', async () => {
        // Luodaan testi blogi
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
    
        const blogAfterPost = await helper.blogsInDb()    // Tarkistetaan mihin tilaan tietokanta on päätynyt
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
      .expect(204)    // No content

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

// Arvo ei muutu
  test('Blogs can be update', async () => {
    const blogsInDB = await helper.blogsInDb()
    const id = blogsInDB[0].id
    
    // Muokataan likejen määrää 1 -> 11
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

// Testien päätteeksi katkaistaan Mongoosen tietokantayhteys 
after(async () => {
  await mongoose.connection.close()
})
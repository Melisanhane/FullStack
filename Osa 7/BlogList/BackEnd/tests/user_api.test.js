const { test, describe,  after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
  await Users.deleteMany({});
  const userObjs = helper.initialUsers.map((user) => new Users(user));
  const promiseUsers = userObjs.map((user) => user.save());

  await Promise.all(promiseUsers);
});

describe('User test', () => {
    beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers) 
      /*
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
      */
  })
  
    test.only('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'newUser',
        name: 'New Uuseri',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })
  })
  
  // ERROR expected 400 "Bad Request", got 201 "Created"
  test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'New User',
        name: 'Superuser',
        password: 'secretti',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert(result.body.error.includes('expected `username` to be unique'))
  
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

  test('Invalid user not be added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Wo',
      name: 'Fail Name',
      password: '1232',
    }
    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
//  assert(result.body.error.includes('expected `username` to be unique'))  // Tällä saa errortekstin? 
  assert.strictEqual(usersAtEnd.length, usersAtStart.length)

  })

after(async () => {
  await mongoose.connection.close()
})

// LIST HELPER TEST || OMA TEHTÄVÄNSÄ
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  const highestLikes = blogs.reduce((curMax, blog) => 
    Math.max(curMax, blog.likes || 0), -Infinity);
  console.log(highestLikes)
  return blogs.find((blog) => blog.likes === highestLikes);
}

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorsByBlogs = _.mapValues(groupedByAuthor, (group) => group.length)
  const authorWithMostBlogs = _.maxBy(_.keys(authorsByBlogs), (author) => authorsByBlogs[author])
  return {
    author: authorWithMostBlogs,
    blogs: authorsByBlogs[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) => {
  const likesByAuthor = {};
  blogs.forEach((blog) => {
    if (likesByAuthor[blog.author]) {
      likesByAuthor[blog.author] += blog.likes;
    } else {
      likesByAuthor[blog.author] = blog.likes;
    }
  });  
  let mostLikedAuthor = {
    author: "",
    likes: 0,
  }
  return mostLikedAuthor
}
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }
const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
}

const totalLikes = blogs => {
  let likes = 0;

  blogs.forEach(blog => {
    likes += blog.likes;
  });

  return likes;
}

const favoriteBlog = blogs => {
  blogs.sort((a, b) => b.likes - a.likes);
  
  return {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes
  };
}

const mostBlogs = blogs => {
  let authors = [];
  blogs.forEach(blog => {
    const match = _.find(authors, {author: blog.author});
    if (match) {
      authors.map(author => {
        author.author === match.author && author.blogs ++;
      })
    } else {
      authors.push({
        author: blog.author,
        blogs: 1,
      })
    }
  })
  authors.sort((a, b) => b.blogs - a.blogs);
  
  return authors[0];
}

const mostLikes = blogs => {
  let authors = [];
  blogs.forEach(blog => {
    const match = _.find(authors, {author: blog.author});
    if (match) {
      authors.map(author => {
        author.author === match.author && (author.likes += blog.likes);
      })
    } else {
      authors.push({
        author: blog.author,
        likes: blog.likes,
      })
    }
  })
  authors.sort((a, b) => b.likes - a.likes);
  console.log(authors);
  
  
  return authors[0];
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

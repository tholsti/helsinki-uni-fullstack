const blogs = require('./test_blogs').blogs;
const listHelper = require('../utils/list_helpers');

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  })
  
  test('of one blog is the likes of that blog', () => {
    const result = listHelper.totalLikes([blogs[0]]);
    expect(result).toBe(7);
  })
  
  test('for a list of blogs is calculated correctly', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  })
})

describe('favorite blogs', () => {
  test('works correctly', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result.title).toEqual('Canonical string reduction')
  })
})

describe('most blogs', () => {
  test('returns correct author', () => {
    const result = listHelper.mostBlogs(blogs);
    console.log(result);
    
    expect(result.author).toEqual('Robert C. Martin');
  })
})

describe('most likes', () => {
  test('returns correct author', () => {
    const result = listHelper.mostLikes(blogs);
    console.log(result);
    
    expect(result.author).toEqual('Edsger W. Dijkstra');
  })
})

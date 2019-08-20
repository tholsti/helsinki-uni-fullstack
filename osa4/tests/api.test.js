const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const { blogs } = require('./test_blogs');

const api = supertest(app);


beforeEach(async () => {
    await Blog.deleteMany({});

    const blogPromises = blogs.map(blog => new Blog(blog).save());
    await Promise.all(blogPromises);
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('returns correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(blogs.length);
});

test('blogs have property id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).not.toBeDefined();
});

test('blogs are created', async () => {
    await api
        .post('/api/blogs')
        .send({
            title: 'testi',
            author: 'tomi',
            url: 'www.google.com',
            likes: 99,
        });

    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(blogs.length + 1);
});

test('if empty likes field, set zero as value', async () => {
    const response = await api
        .post('/api/blogs')
        .send({
            title: 'testi',
            author: 'tomi',
            url: 'www.google.com',
        });

    expect(response.body.likes).toBe(0);
});

test('returns 400 if no title or url provided', async () => {
    await api
        .post('/api/blogs')
        .send({
            title: 'testi',
            author: 'tomi',
        })
        .expect(400);

    await api
        .post('/api/blogs')
        .send({
            url: 'www.google.com',
            author: 'tomi',
        })
        .expect(400);
});

test('deletes blog post', async () => {
    await api.delete(`/api/blogs/delete/${blogs[0]._id}`);

    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(blogs.length - 1);
});

afterAll(() => {
    mongoose.connection.close();
});

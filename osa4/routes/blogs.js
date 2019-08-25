const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .find({}).populate('user', { blogs: 0 });

    response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
    const { body } = request;

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }
        const user = await User.findById(decodedToken.id);

        const blog = new Blog({
            ...body,
            user: user._id,
        });

        const result = await blog.save();
        user.blogs = user.blogs.concat(result._id);
        await user.save();

        response.json(result.toJSON());
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete('/delete/:id', async (request, response, next) => {
    const { id } = request.params;

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }

        const blog = await Blog.findById(id);

        if (decodedToken.id !== blog.user.toString()) {
            return response.status(401).json({ error: 'incorrect user' });
        }

        const blogToDelete = await Blog.findByIdAndDelete(id);
        response.status(200).json(blogToDelete);
    } catch (e) {
        next(e);
    }
});

blogsRouter.put('/update/:id', async (req, res, next) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const result = await Blog.findByIdAndUpdate(id, update, { new: true });
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
});

module.exports = blogsRouter;

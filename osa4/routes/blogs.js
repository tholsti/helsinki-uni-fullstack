const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});

    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);

    try {
        const result = await blog.save();
        response.status(201).json(result);
    } catch (exception) {
        response.sendStatus(400);
    }
});

blogsRouter.delete('/delete/:id', async (request, response) => {
    const { id } = request.params;

    const result = await Blog.findByIdAndDelete(id);

    response.status(200).json(result);
});

blogsRouter.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const result = await Blog.findByIdAndUpdate(id, update, { new: true });
        res.status(200).json(result);
    } catch (e) {
        res.sendStatus(400);
    }
});

module.exports = blogsRouter;

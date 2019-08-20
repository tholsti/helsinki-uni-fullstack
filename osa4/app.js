const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./routes/blogs');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;

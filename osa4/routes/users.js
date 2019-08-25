const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res, next) => {
    try {
        const { body } = req;

        if (body.password.length < 3) {
            res.status(400).json(new Error('Password is too short')).send();
            return;
        }

        const saltRounds = 10;
        const pwHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            username: body.username,
            name: body.name,
            pwHash,
        });

        const savedUser = await user.save();

        res.json(savedUser);
    } catch (e) {
        next(e);
    }
});

usersRouter.get('/', async (req, res, next) => {
    const users = await User.find({})
        .find({}).populate('blogs', {
            user: 0,
            likes: 0,
        });

    res.json(users.map(u => u.toJSON()));
});

module.exports = usersRouter;

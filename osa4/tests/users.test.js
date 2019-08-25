const supertest = require('supertest');
const User = require('../models/user');
const helpers = require('./test_helper');
const app = require('../app');

const api = supertest(app);

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const user = new User({ username: 'root', password: 'sekret' });
        await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helpers.usersInDb();

        const newUser = {
            username: 'tomppa',
            name: 'Tomi Holstila',
            password: 'salasana',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helpers.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helpers.usersInDb();

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain(`Error, expected \`username\` to be unique. Value: \`${newUser.username}\``);

        const usersAtEnd = await helpers.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });
});

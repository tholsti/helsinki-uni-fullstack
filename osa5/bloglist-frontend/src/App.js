import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import AddBlog from './components/AddBlog';
import Message from './components/Message';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [blogs, setBlogs] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem('loggedInUser')));
        blogService.setToken(JSON.parse(window.localStorage.getItem('loggedInUser')).token);
    }, []);

    useEffect(() => {
        blogService.getAll().then(blogs => {
            setBlogs(blogs);
        });
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            });

            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
            setToken(user.token);
            blogService.setToken(user.token);

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Invalid password or username');
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedInUser');
        setUser(null);
    };

    if (user === null) {
        return (
            <div>
                {errorMessage && <Message msg={errorMessage} type={'error'}/>}
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }

    if (user !== null) {
        return (
            <div>
                <div>
                    {user.name} logged in
                </div>
                <AddBlog/>
                <div>
                    <h2>List of blogs</h2>
                    {!blogs
                        ? setBlogs[blogService.getAll()]
                        : blogs && blogs.map(blog =>
                            <Blog key={blog.id} blog={blog} />
                        )
                    }
                </div>
                <button onClick={logout}>Log out</button>
            </div>
        )
    }
}

export default App;

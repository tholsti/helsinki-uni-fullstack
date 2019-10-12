import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import AddBlog from './components/AddBlog';
import Message from './components/Message';
import Togglable from './components/Togglable'; 
import useField from './services/hooks/useField';
import { getInputProperties } from './services/utils';

function App() {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [blogs, setBlogs] = useState(null);
    const [token, setToken] = useState('');
    const [addBlog, setAddBlog] = useState(false);

    useEffect(() => {
        if (!window.localStorage.getItem('loggedInUser')) {
            return;
        }
        setUser(JSON.parse(window.localStorage.getItem('loggedInUser')));
        blogService.setToken(JSON.parse(window.localStorage.getItem('loggedInUser')).token);
    }, []);

    useEffect(() => {
        blogService.getAll().then(blogs => {
            blogs.sort((a, b) => b.likes - a.likes);
            setBlogs(blogs);
        });
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username: username.value, 
                password: password.value,
            });

            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
            setToken(user.token);
            blogService.setToken(user.token);

            setUser(user)
        } catch (exception) {
            setErrorMessage('Invalid password or username');
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedInUser');
        setUser(null);
    };

    const username = useField('text');
    const password = useField('password');

    if (user === null) {
        return (
            <div>
                {errorMessage && <Message msg={errorMessage} type={'error'}/>}
                <form onSubmit={handleLogin}>
                    <div>
                        username: 
                        <input 
                            name='Username'
                            {...getInputProperties(username)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            name="Password"
                            { ...getInputProperties(username) }
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
                <Togglable isVisible={addBlog}>
                    <AddBlog/>
                </Togglable>
                <button onClick={() => setAddBlog(!addBlog)}>{!addBlog ? 'Add new blog' : 'Cancel'}</button>
                <div>
                    <h2>List of blogs</h2>
                    {!blogs
                        ? setBlogs[blogService.getAll()]
                        : blogs && blogs.map(blog =>
                            <Blog key={blog.id} blog={blog} user={user}/>
                        )
                    }
                </div>
                <button onClick={logout}>Log out</button>
            </div>
        )
    }
}

export default App;

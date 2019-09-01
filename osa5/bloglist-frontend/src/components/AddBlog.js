import React, { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import Message from './Message';

const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const submit = async e => {
        e.preventDefault();
        
        const response = await blogService.add({
            title,
            author,
            url
        });
        console.log(response);
        
        const { error } = response;

        if (error) {
            setErrorMessage(error);
        } else {
            setSuccessMessage(`A new blog ${response.title} by ${response.author} added`);            
        }
        setTimeout(() => {
            setErrorMessage(null);
            setSuccessMessage(null);
        }, 3000)
        
    };

    return (
        <>
            {successMessage && <Message type={'success'} msg={successMessage}/>}
            {errorMessage && <Message type={'error'} msg={errorMessage}/>}
            
            <h2>Create new blog</h2>
            <form onSubmit={submit}>
                <input
                    type={'text'}
                    value={title}
                    placeholder={'title'}
                    onChange={({ target }) => setTitle(target.value)}
                />
                <input
                    type={'text'}
                    value={author}
                    placeholder={'author'}
                    onChange={({ target }) => setAuthor(target.value)}
                />
                <input
                    type={'text'}
                    value={url}
                    placeholder={'url'}
                    onChange={({ target }) => setUrl(target.value)}
                />
                <button type={'submit'} >
                    Create
                </button>
            </form>
        </>
    )    
}

export default AddBlog;

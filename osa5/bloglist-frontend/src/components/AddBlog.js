import React, { useState } from 'react';
import blogService from '../services/blogs';
import Message from './Message';
import useField from '../services/hooks/useField';
import { getInputProperties } from '../services/utils';

const AddBlog = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const submit = async e => {
        e.preventDefault();
        
        const response = await blogService.add({
            title: title.value,
            author: author.value,
            url: url.value,
        });
        
        const { error } = response;

        if (error) {
            setErrorMessage(error);
        } else {
            setSuccessMessage(`A new blog ${response.title} by ${response.author} added`);            
        }
        setTimeout(() => {
            setErrorMessage(null);
            setSuccessMessage(null);
        }, 5000)        
    };

    const title = useField('text');
    const author = useField('text');
    const url = useField('text');

    return (
        <>
            {successMessage && <Message type={'success'} msg={successMessage}/>}
            {errorMessage && <Message type={'error'} msg={errorMessage}/>}
            
            <h2>Create new blog</h2>
            <form onSubmit={submit}>
                <input {...getInputProperties(title)} placeholder={'Title'}/>
                <input {...getInputProperties(author)} placeholder={'Author'}/>
                <input {...getInputProperties(url)} placeholder={'URL'}/>
                <button type={'submit'} >
                    Create
                </button>
            </form>
        </>
    )    
}

export default AddBlog;

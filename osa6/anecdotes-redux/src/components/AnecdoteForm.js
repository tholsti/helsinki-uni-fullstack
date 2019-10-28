import React from 'react';
import { connect } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { newAnecdoteNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ createNewAnecdote, newAnecdoteNotification }) => {
    
    const createAnecdote = e => {
        e.preventDefault();
        const text = e.target.newAnecdote.value;
        createNewAnecdote(text);
        newAnecdoteNotification(text);
        setTimeout(() => {
            newAnecdoteNotification('');
        }, 5000);
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
            <div>
                <input name={'newAnecdote'}/>
            </div>
            <button>create</button>
          </form>
        </div>
    );
}

export default connect(null, { createNewAnecdote, newAnecdoteNotification })(AnecdoteForm);

import React from 'react';
import { connect } from 'react-redux';
import { newAnecdoteNotification } from '../reducers/notificationReducer';
import { addNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ addNewAnecdote, newAnecdoteNotification }) => {
    
    const createAnecdote = async e => {
        e.preventDefault();
        const content = e.target.newAnecdote.value;
        e.target.newAnecdote.value = '';
        // const anecdote = await createNewAnecdote(content);
        // addNewAnecdote(anecdote);
        addNewAnecdote(content);

        newAnecdoteNotification(content);
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

export default connect(null, { addNewAnecdote, newAnecdoteNotification })(AnecdoteForm);

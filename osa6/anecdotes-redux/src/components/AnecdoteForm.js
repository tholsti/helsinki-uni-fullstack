import React from 'react';
import { connect } from 'react-redux';
import { setNewNotification } from '../reducers/notificationReducer';
import { addNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ addNewAnecdote, setNewNotification }) => {
    
    const createAnecdote = async e => {
        e.preventDefault();
        const content = e.target.newAnecdote.value;
        e.target.newAnecdote.value = '';
        addNewAnecdote(content);
        setNewNotification(`you created new anecdote: ${content}`, 5);
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

export default connect(null, { addNewAnecdote, setNewNotification })(AnecdoteForm);

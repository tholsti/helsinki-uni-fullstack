import React from 'react'
import { createNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ store }) => {
    
    const createAnecdote = e => {
        e.preventDefault();
        const text = e.target.newAnecdote.value;
        store.dispatch(createNewAnecdote(text))
    }

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
    )
}

export default AnecdoteForm

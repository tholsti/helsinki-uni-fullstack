import React from 'react';
import { Provider, connect } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = ({ store, initializeAnecdotes }) => { 
    React.useEffect(() => {
        initializeAnecdotes();
    });

    return (
    <Provider store={store}>
        <h2>Anecdotes</h2>
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />      
        <Notification />
    </Provider>
)};


export default connect(null, { initializeAnecdotes })(App)

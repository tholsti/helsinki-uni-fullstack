import React from 'react';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { newVoteNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
    const { anecdotesToShow, addVote, newVoteNotification } = props;

    const vote = anecdote => {
        addVote(anecdote);
        newVoteNotification(anecdote.content);
        setTimeout(() => {
            newVoteNotification('');
        }, 5000);
    };

    return (
        <div>
            {anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                    {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes} votes 
                    <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}            
        </div>
    );
}

const mapStateToProps = ({ anecdotes, filter }) => {
    const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.includes(filter));
    
    return { anecdotesToShow };
}

const mapDispatchToProps = { addVote, newVoteNotification };

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);

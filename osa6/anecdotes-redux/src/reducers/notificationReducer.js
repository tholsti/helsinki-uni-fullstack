const initialNotification = '';

export const newVoteNotification = text => ({
    type: 'NEW_VOTE_NOTIFICATION',
    msg: text === '' ? '' : `You voted for "${text}"`,
});

export const newAnecdoteNotification = text => ({
    type: 'NEW_ANECDOTE_NOTIFICATION',
    msg: text === '' ? '' : `You created new anecdote "${text}"`,
});

export const notificationReducer = (state = initialNotification, action) => {
    switch (action.type) {
        case 'NEW_VOTE_NOTIFICATION': {
            return action.msg;
        }
        case 'NEW_ANECDOTE_NOTIFICATION': {
            return action.msg;
        }
        default: {
            break;
        }
    }

    return state;
};

import { getAnecdotes, saveNewAnecdote, updateVote } from '../services/anecdotes'

export const addVote = anecdote => {
  return async dispatch => {
    await updateVote(anecdote);
    dispatch({
      type: 'ADD_VOTE',
      id: anecdote.id,
    })
  }
}

export const addNewAnecdote = content => {
  return async dispatch => {
    const anecdote = await saveNewAnecdote({
      content
    });
    
    dispatch({
      type: 'ADD_NEW_ANECDOTE',
      data: anecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAnecdotes();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      const anecdotes = [...state];
      anecdotes.sort((a, b) => b.votes - a.votes);
      return anecdotes;
    case 'ADD_NEW_ANECDOTE':
      return [
        ...state,
        action.data,
      ]
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      break;
  }
  return state
}

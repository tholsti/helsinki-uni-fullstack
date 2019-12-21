import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const getAnecdotes = async () => {
    const resp = await axios.get(`${baseUrl}/anecdotes`);
    return resp.data;
}

export const saveNewAnecdote = async ({ content }) => {
    const anecdote = {
        content,
        votes: 0
    };
    const response = await axios.post(`${baseUrl}/anecdotes`, anecdote);
    return response.data;
}

export const updateVote = async (anecdote) => {
    const updatedAnecdote = {
        votes: anecdote.votes++,
        ...anecdote,
    }
    const response = await axios.put(`${baseUrl}/anecdotes/${anecdote.id}`, updatedAnecdote);
    return response;
}

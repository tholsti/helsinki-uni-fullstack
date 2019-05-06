import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MostVotes = ({ votes, anecdotes }) => {
  const max = Math.max(...votes);
  
  return (
  <>
    <h2>Most votes</h2>
    {`${max} votes: ${anecdotes[votes.indexOf(max)]}`}
  </>
)};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const vote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>
        {props.anecdotes[selected]}
      </p>
      <p>
        {`Has ${votes[selected]} votes`}
      </p>
      <button onClick={() => vote()}>Vote for this!</button>
      <br/>
      <button onClick={() => nextAnecdote()}>Next anecdote</button>
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

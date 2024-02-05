import { useState } from 'react'

const VoteStatistics = (props) => {
    return (
      <p>has {props.votelist[props.selected]} votes</p>
    )
}

const Statistics = ({votelist, anecdotes}) => {
  let biggest = 0
  let location = 0
  for (let i = 0; i < votelist.length; i++) { 
    if (biggest < votelist[i]) {
      biggest = votelist[i]
      location = i
    }
  }
  return (
    <p>{anecdotes[location]}
    <br/>
    has {biggest} votes</p>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}> {text} </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))  // Uusi lista

   const Vote = () => {
    const copyVotes =[...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  const RandomAnecdote = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <VoteStatistics votelist={votes} selected={selected} />
      <br/>
      <Button handleClick={Vote} text='vote' />
      <Button handleClick={RandomAnecdote} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Statistics votelist={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App
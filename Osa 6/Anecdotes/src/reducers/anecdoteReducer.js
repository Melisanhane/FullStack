const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      // Etsitään oikea id 
      const id = action.payload.id
      const anecdoteToVote = state.find(anecdote => 
        anecdote.id === id
      )
      // Kun löydetty, niin kopioidaan lista ja lisätään ääni
      const votedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes + 1
      }
      // Palautetaan uusi lista 
      return state.map(anecdote => 
        anecdote.id !== id  // Jos ID ei ole ID
          ? anecdote        // ? = Jos True
          :votedAnecdote    // : = Jos False
      )
      case 'NEW_ANECDOTE':
        const content = asObject(action.payload.content)
        state.push(content)
        return state
      default:
        return state 
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
    }
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id: id,
    }
  }
}

export default reducer
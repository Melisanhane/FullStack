const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

// jos pelkkä state = 0, toimii
const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return state.good + 1
    case 'OK':
      return state.ok + 1
    case 'BAD':
      return state.bad + 1
    case 'ZERO':
      return 0
    default: 
      return state
  }
  
}

export default counterReducer

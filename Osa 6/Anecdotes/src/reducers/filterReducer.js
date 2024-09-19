const filterReducer = (state='ALL', action) => { 
    console.log('state', state)
    console.log('actuon', action)
      switch (action.type) {
        case 'SET_FILTER':
          return {
            ...state, 
            filter: action.payload,
          }
        default:
          return state
      }
  }
  
export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }

export default filterReducer
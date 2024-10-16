import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  else if (notification === 'add') {
    return (
      <div className="add">
        {'a new blog added'}
      </div>
    )
  }
  else if (notification === 'error')
    return (
      <div className="error">
        {'wrong username or password'}
      </div>
    )
  else if (notification === 'remove') {
    return (
      <div className="add">
        {'blog removed'}
      </div>
    )
  }
  else if (notification === 'update') {
    return (
      <div className="add">
        {'blog update'}
      </div>
    )
  }
}

export default Notification
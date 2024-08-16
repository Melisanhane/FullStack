import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  else if (notification === 'add') {
    return (
      <div className="add">
        {'a new blog has been added'}
      </div>
    )
  }
  else if (notification === 'error')
    return (
      <div className="error">
        {'wrong username or password'}
      </div>
    )
}

export default Notification
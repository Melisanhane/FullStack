const Notification = ({ errorMessage, message }) => {
  if (message) {
    return (
      <div className="message">
      {message}
    </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  
  return null
}

export default Notification
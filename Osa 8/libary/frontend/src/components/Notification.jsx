// import { useSelector } from 'react-redux'

const Notification = ({ errorMessage }) => {
    if (!errorMessage) {
        return null
    }

  return (
    <div className="notify">
      {errorMessage}
    </div>
  )
}

export default Notification
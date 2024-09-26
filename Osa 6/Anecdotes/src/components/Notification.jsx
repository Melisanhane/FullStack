import { useSelector, useDispatch } from 'react-redux'
// import { addNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: 5,
  }
  return (
<div style={notification === null ? {display: 'none'} : style}>
      {notification}
    </div>
  )
}

export default Notification
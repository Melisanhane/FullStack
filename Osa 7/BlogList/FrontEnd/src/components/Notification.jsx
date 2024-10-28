import { useNotificationValue } from "../NotificationContext"
import "../style.css"

const Notification = () => {
  
  const notification = useNotificationValue()

  return (
    <div className={notification === '' ? {display: 'none'} : "notification"}>
      {notification}
    </div>
  )
}

export default Notification
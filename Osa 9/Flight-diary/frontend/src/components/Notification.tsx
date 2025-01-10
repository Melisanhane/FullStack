import '../style.css'

type NotificationProps = {
    errorMessage: string | null;
};

const Notification = ({ errorMessage }: NotificationProps) => {
  
    if (errorMessage) {
      return (
        <div className="error">
          {errorMessage}
        </div>
      )
    }
    console.log(errorMessage)
    return null
  }
  
  export default Notification
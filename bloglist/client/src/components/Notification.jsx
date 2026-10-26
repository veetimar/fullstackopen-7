import { Alert } from './Styled'
import { useNotification } from '../store'

const Notification = () => {
  const text = useNotification()

  if (!text) {
    return null
  }

  return <Alert className="notification">{text}</Alert>
}

export default Notification

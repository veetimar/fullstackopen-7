import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from './Styled'
import { useNotificationActions, useUserActions } from '../store'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useUserActions()
  const { notify } = useNotificationActions()
  const navigate = useNavigate()

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    const credentials = { username, password }
    setUsername('')
    setPassword('')
    try {
      await login(credentials)
    } catch {
      notify('Wrong login credentials')
      return
    }
    notify('Login succesful')
    navigate('/')
  }

  return (
    <div>
      <h2>Login to the application</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>
            username
            <Input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <Button>Login</Button>
      </form>
    </div>
  )
}

export default Login

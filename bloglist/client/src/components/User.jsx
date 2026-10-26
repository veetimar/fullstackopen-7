import { useMatch } from 'react-router-dom'
import { Unit } from './Styled'
import { useUsers } from '../store'

const User = () => {
  const users = useUsers()
  const match = useMatch('/users/:id')

  const user = users.find((u) => u.id === match.params.id)

  if (!user) {
    return <h2>404 - Page not found</h2>
  }

  return (
    <Unit className="user">
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </Unit>
  )
}

export default User

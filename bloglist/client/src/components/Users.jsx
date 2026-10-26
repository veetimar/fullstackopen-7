import { useUsers } from '../store'
import { TableHeader } from './Styled'

const Users = () => {
  const users = useUsers()

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <TableHeader>Name</TableHeader>
          <TableHeader>Username</TableHeader>
          <TableHeader>Blogs created</TableHeader>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Users

import { Link } from 'react-router-dom'
import { useUsers } from '../store'
import { TableHeader, Table } from './Styled'

const Users = () => {
  const users = useUsers()

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Username</TableHeader>
            <TableHeader>Blogs created</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{<Link to={`/users/${user.id}`}>{user.name}</Link>}</td>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users

import { useEffect } from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'
import { FakeButton, Navigation } from './components/Styled'
import {
  useNotificationActions,
  useUserActions,
  useBlogActions,
  useLoginActions,
  useLogin,
} from './store'

const App = () => {
  const { notify } = useNotificationActions()
  const { initialize: initBlogs } = useBlogActions()
  const { initialize: initLogin, logout } = useLoginActions()
  const { initialize: initUsers } = useUserActions()
  const user = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    initBlogs()
    initLogin()
    initUsers()
  }, [initBlogs, initLogin, initUsers])

  const handleLogout = () => {
    logout()
    notify('Logout succesful')
    navigate('/')
  }

  const margin = {
    margin: 5,
  }

  return (
    <div>
      <Navigation>
        <Link to="/" style={margin}>
          blogs
        </Link>
        <Link to="/users" style={margin}>
          users
        </Link>
        <Link to="/create" style={margin}>
          new blog
        </Link>
        {!user && (
          <Link to="/login" style={margin}>
            login
          </Link>
        )}
        {user && (
          <FakeButton onClick={handleLogout} style={margin}>
            logout
          </FakeButton>
        )}
      </Navigation>
      <ErrorBoundary>
        <Notification />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="create" element={<BlogForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App

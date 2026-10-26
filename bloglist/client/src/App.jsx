import { useEffect } from 'react'
import { Route, Routes, Link, useNavigate, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
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
  useBlogs,
  useLogin,
} from './store'

const App = () => {
  const { notify } = useNotificationActions()
  const { initialize: initBlogs } = useBlogActions()
  const { initialize: initLogin, logout } = useLoginActions()
  const { initialize: initUsers } = useUserActions()
  const blogs = useBlogs()
  const user = useLogin()
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')

  useEffect(() => {
    initBlogs()
    initLogin()
    initUsers()
  }, [initBlogs, initLogin, initUsers])

  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

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
          Blogs
        </Link>
        <Link to="/users" style={margin}>
          Users
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
          {blog && <Route path="/blogs/:id" element={<Blog blog={blog} />} />}
          <Route path="*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App

import { useEffect } from 'react'
import { Route, Routes, Link, useNavigate, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'
import { FakeButton, Navigation } from './components/Styled'
import {
  useNotificationActions,
  useBlogActions,
  useUserActions,
  useBlogs,
  useUser,
} from './store'

const App = () => {
  const { notify } = useNotificationActions()
  const { initialize: initBlogs } = useBlogActions()
  const { initialize: initUser, logout } = useUserActions()
  const blogs = useBlogs()
  const user = useUser()
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')

  useEffect(() => {
    initBlogs()
    initUser()
  }, [initBlogs, initUser])

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
          home
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

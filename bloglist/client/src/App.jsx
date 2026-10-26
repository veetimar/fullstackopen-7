import { useState, useEffect } from 'react'
import { Route, Routes, Link, useNavigate, useMatch } from 'react-router-dom'
import blogService from './services/blogs'
import login from './services/login'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'
import { FakeButton, Navigation } from './components/Styled'
import { useNotificationActions, useBlogs, useBlogActions } from './store'

const App = () => {
  const [user, setUser] = useState(null)
  const { setNotification } = useNotificationActions()
  const { initialize, add, like, remove } = useBlogActions()
  const blogs = useBlogs()
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    let user = window.localStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  const handleLogin = async (username, password) => {
    let user
    try {
      user = await login({ username, password })
    } catch {
      setNotification('Wrong login credentials')
      setTimeout(() => setNotification(''), 5000)
      return
    }
    setUser(user)
    window.localStorage.setItem('user', JSON.stringify(user))
    blogService.setToken(user.token)
    setNotification('Login succesful')
    setTimeout(() => setNotification(''), 5000)
    navigate('/')
  }

  const HandleBlogCreation = async (newBlog) => {
    try {
      await add(newBlog)
    } catch {
      setNotification('Blog creation failed')
      setTimeout(() => setNotification(''), 5000)
      return
    }
    setNotification('Created blog ' + newBlog.title)
    setTimeout(() => setNotification(''), 5000)
    navigate('/')
  }

  const likeBlog = async (blog) => {
    like(blog.id)
  }

  const deleteBlog = async (blog) => {
    if (!confirm(`Remove blog ${blog.title}?`)) {
      return
    }
    try {
      await remove(blog.id)
    } catch {
      setNotification('Blog deletion failed')
      setTimeout(() => setNotification(''), 5000)
      return
    }
    setNotification('Deleted blog')
    setTimeout(() => setNotification(''), 5000)
    navigate('/')
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    blogService.setToken('')
    setNotification('Logout succesful')
    setTimeout(() => setNotification(''), 5000)
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
          <Route path="/" element={<Blogs blogs={blogs} />} />
          <Route
            path="create"
            element={<BlogForm createBlog={HandleBlogCreation} />}
          />
          <Route path="/login" element={<Login login={handleLogin} />} />
          {blog && (
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blog={blog}
                  like={likeBlog}
                  remove={deleteBlog}
                  user={user}
                />
              }
            />
          )}
          <Route path="*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App

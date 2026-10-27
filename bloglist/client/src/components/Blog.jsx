import { useNavigate, useMatch } from 'react-router-dom'
import { Unit, Button } from './Styled'
import {
  useNotificationActions,
  useBlogActions,
  useLogin,
  useBlogs,
} from '../store'

const Blog = () => {
  const user = useLogin()
  const { notify } = useNotificationActions()
  const { like, remove } = useBlogActions()
  const blogs = useBlogs()
  const match = useMatch('/blogs/:id')
  const navigate = useNavigate()

  const blog = blogs.find((u) => u.id === match.params.id)

  if (!blog) {
    return <h2>404 - Page not found</h2>
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
      notify('Blog deletion failed')
      return
    }
    notify('Deleted blog')
    navigate('/')
  }

  return (
    <Unit className="blog">
      <h3>
        {blog.author}: {blog.title}
      </h3>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}{' '}
          {user && <Button onClick={() => likeBlog(blog)}>like</Button>}
        </div>
        <div>Added by {blog.user.name}</div>
        <div>
          {user && user.username === blog.user.username && (
            <Button onClick={() => deleteBlog(blog)}>remove</Button>
          )}
        </div>
      </div>
      <h4>Comments</h4>
      <ul>
        {blog.comments.map((c) => (
          <li>{c}</li>
        ))}
      </ul>
    </Unit>
  )
}

export default Blog

import { useNavigate } from 'react-router-dom'
import { Unit, Button } from './Styled'
import { useNotificationActions, useBlogActions, useUser } from '../store'

const Blog = ({ blog }) => {
  const user = useUser()
  const { notify } = useNotificationActions()
  const { like, remove } = useBlogActions()
  const navigate = useNavigate()

  if (!blog) {
    return null
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
    </Unit>
  )
}

export default Blog

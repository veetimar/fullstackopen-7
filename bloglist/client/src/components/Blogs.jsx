import { Link } from 'react-router-dom'
import { List } from './Styled'
import { useBlogs } from '../store'

const Blogs = () => {
  const blogs = useBlogs()

  return (
    <div className="blogs">
      <h2>Blogs</h2>
      <List>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </List>
    </div>
  )
}

export default Blogs

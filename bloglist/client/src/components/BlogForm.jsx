import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from './Styled'
import { useNotificationActions, useBlogActions } from '../store'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { notify } = useNotificationActions()
  const { add } = useBlogActions()
  const navigate = useNavigate()

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    try {
      await add(newBlog)
    } catch {
      notify('Blog creation failed')
      return
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    notify('Created blog ' + newBlog.title)
    navigate('/')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <label>
            title
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <Input
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <Input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
        </div>
        <Button>create</Button>
      </form>
    </div>
  )
}

export default BlogForm

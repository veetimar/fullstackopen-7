import { create } from 'zustand'
import blogService from './services/blogs'
import userService from './services/user'

const useNotificationStore = create((set) => ({
  content: '',
  actions: {
    notify: (value) => {
      set({ content: value })
      setTimeout(() => {
        set({ content: '' })
      }, 5000)
    },
  },
}))

export const useNotification = () =>
  useNotificationStore((state) => state.content)

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)

const sortBlogs = (blogs) => {
  return blogs.toSorted((a, b) => b.likes - a.likes)
}

const useBlogStore = create((set, get) => ({
  blogs: [],
  actions: {
    initialize: () => {
      blogService.getAll().then((blogs) => set(() => ({ blogs })))
    },
    add: async (blog) => {
      const newBlog = await blogService.create(blog)
      set((state) => ({ blogs: state.blogs.concat(newBlog) }))
    },
    like: async (id) => {
      const blog = get().blogs.find((b) => b.id === id)
      const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      const response = await blogService.update(newBlog)
      set((state) => ({
        blogs: state.blogs.map((b) => (b.id === id ? response : b)),
      }))
    },
    remove: (id) => {
      return blogService
        .remove(id)
        .then(
          set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) }))
        )
    },
  },
}))

export const useBlogs = () => sortBlogs(useBlogStore((state) => state.blogs))

export const useBlogActions = () => useBlogStore((state) => state.actions)

const useUserStore = create((set) => ({
  user: null,
  actions: {
    initialize: () => {
      let user = window.localStorage.getItem('user')
      if (user) {
        user = JSON.parse(user)
        set(() => ({ user }))
        blogService.setToken(user.token)
      }
    },
    login: async (credentials) => {
      const user = await userService.login(credentials)
      set(() => ({ user }))
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
    },
    logout: () => {
      set(() => ({ user: null }))
      window.localStorage.removeItem('user')
      blogService.setToken('')
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)

export const useUserActions = () => useUserStore((state) => state.actions)

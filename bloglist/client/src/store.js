import { create } from 'zustand'
import blogService from './services/blogs'

const useNotificationStore = create((set) => ({
  content: '',
  actions: {
    setNotification: (value) => set({ content: value }),
  },
}))

export const useNotification = () =>
  useNotificationStore((state) => state.content)

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)

const sortBlogs = (blogs) => {
  return blogs.toSorted((a, b) => b.likes - a.likes)
}

const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    initialize: () => {
      blogService.getAll().then((blogs) => set(() => ({ blogs })))
    },
    add: async (blog) => {
      const newBlog = await blogService.create(blog)
      set((state) => ({ blogs: state.blogs.concat(newBlog) }))
    },
  },
}))

export const useBlogs = () => sortBlogs(useBlogStore((state) => state.blogs))

export const useBlogActions = () => useBlogStore((state) => state.actions)

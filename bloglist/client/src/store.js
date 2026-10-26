import { create } from 'zustand'

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

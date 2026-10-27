export const getUser = () => {
  let user = window.localStorage.getItem('user')
  if (user) {
    return JSON.parse(user)
  }
  return null
}

export const saveUser = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user))
}

export const removeUser = () => {
  window.localStorage.removeItem('user')
}

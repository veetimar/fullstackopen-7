import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then((response) => response.data)
}

export default { getAll }

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {  
  token = newToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, {headers: { Authorization: `Bearer ${token}`, }}) 
  return response.data
}

const update = (id, newObject) => {
  console.log(newObject)
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id, user) => {  
  const response = await axios.delete(`${baseUrl}/${id}`, {headers: { Authorization: `Bearer ${user.token}`, }})
  return response.data
  }
  
export default { 
  getAll, create, update, setToken, remove 
}
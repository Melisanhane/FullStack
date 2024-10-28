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

const update = (newObject) => {
  const response = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return response.data
}

const remove = async (object) => {  
  const response = await axios.delete(`${baseUrl}/${object.blog.id}`, {headers: { Authorization: `Bearer ${object.user.token}`, }})
  return response.data
  }

const comment = async (newObject) => {
  const response = axios.post(`${baseUrl}/${newObject.id}/comments`, newObject)
  return response.data
}

export default { 
  getAll, create, update, setToken, remove, comment 
}
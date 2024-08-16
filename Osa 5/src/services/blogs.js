import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {  
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  debugger
  const response = await axios.post(baseUrl, newObject, {headers: { Authorization: `bearer ${token}` }}) 
  return response.data
}

const update = (id, newObject) => {
  debugger  
  // herjaa jwt must be provided
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id, user) => {  
  debugger
  console.log(user)
  // herjaa jwt must be provided || tokeni kusee jotenkin
  console.log(user.token)
  console.log(token)
  const response = await axios.delete(`${baseUrl}/${id}`, { Authorization: `${token}` })
  console.log(response)
  return response.data
  }

/*
// Tämä on sama kuin update eli ei välttis tarvisi
const likes = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
*/
export default { 
  getAll, create, update, setToken, remove 
}
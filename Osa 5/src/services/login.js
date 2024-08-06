import axios from 'axios'
const baseUrl = '/api/login'
/*
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
/* Tai tämä ?? 
const getAll = async () => {
  const request = await axios.get(baseurl)
  return request.data  
*/

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default {login}
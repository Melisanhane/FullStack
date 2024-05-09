import axios from 'axios'
const baseUrl = 'api/persons'
// Kun muokataan, täytyy production build (npm run bulid) ja kopioida dist BackEndin juureen

 
const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const del = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
    getAll, 
    create, 
    update,
    del 
}
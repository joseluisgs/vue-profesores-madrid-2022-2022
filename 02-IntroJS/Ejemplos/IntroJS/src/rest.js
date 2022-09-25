import axios from 'axios'

// Usaremos esta: https://jsonplaceholder.typicode.com/

const rest = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
})

// get all users
export const getUsers = async () => {
  const res = await rest.get('/')
  console.log(res.status)
  return res.data
}

// get user by id
export const getUserById = async (id) => {
  const res = await rest.get(`/${id}`)
  console.log(res.status)
  return res.data
}

// create user
export const createUser = async (user) => {
  const res = await rest.post('/', user)
  console.log(res.status)
  return res.data
}

// update user
export const updateUser = async (id, user) => {
  const res = await rest.put(`/${id}`, user)
  console.log(res.status)
  return res.data
}

// delete user
export const deleteUser = async (id) => {
  const res = await rest.delete(`/${id}`)
  console.log(res.status)
  return res.data
}

import axios from "axios";

const usersApi = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export const getUsers = async () => {
    const res = await usersApi.get('http://localhost:8080/users')
    return res.data
}


export const getUser = async (id) => {
    const res = await usersApi.get(`/users/${id}`, id)
    return res.data
}

export const addUser = async (user) => {
    return await usersApi.post('/users', user)
}

export const updateUser = async (user) => {
    return await usersApi.put(`/users/${user._id}`, user)
}

export const deleteUser = async (id) => {
    return await usersApi.delete(`/users/${id}`, id)
}

export default usersApi;
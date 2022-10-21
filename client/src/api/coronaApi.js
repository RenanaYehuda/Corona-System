import axios from "axios";

const usersApi = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export const getAllCorona = async () => {
    const res = await usersApi.get('http://localhost:8080/corona')
    return res.data
}


export const getCorona = async (id) => {
    const res = await usersApi.get(`/corona/${id}`, id)
    return res.data[0]
}

export const addCorona = async (user) => {
    return await usersApi.post('/corona', user)
}

export const updateCorona = async (user) => {
    return await usersApi.put(`/corona/${user._id}`, user)
}

export const deleteCorona = async (id) => {
    return await usersApi.delete(`/corona/${id}`, id)
}

export default usersApi;
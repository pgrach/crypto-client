import axios from 'axios';
const TIMEOUT = 5 * 60 * 1000;

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: TIMEOUT,
})

api.interceptors.request.use((config) => {
    config.headers['Authorization'] = 'Bearer token';
    return config
}, (error) => {
    return Promise.reject(error)
})

export default api;

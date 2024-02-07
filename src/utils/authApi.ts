import axios from 'axios';
const TIMEOUT = 5 * 60 * 1000;

const authApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: TIMEOUT,
})

export default authApi;

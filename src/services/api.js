import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.255.102:3000'
})

export default api;
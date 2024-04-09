import axios from "axios";

export const api = axios.create({
    baseURL: 'https://blog-api-server-6rak.onrender.com'
})
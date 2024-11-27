// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://real-estate-kaif-uzu3.vercel.app/',
});

export default api;

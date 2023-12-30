// src/api/index.js
import axios from "axios";

const host = axios.create({
    baseURL: 'http://localhost:3000/',
});

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');

export default host;

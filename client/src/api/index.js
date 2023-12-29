const axios = require("axios");

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');

const host = axios.create({
    baseURL: 'http://localhost:5000/',
});

module.exports = host;

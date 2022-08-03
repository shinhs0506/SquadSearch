import Axios from 'axios';

const baseURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ? 'http://localhost:4000/api'
    : 'https://cpsc455-squadsearch-backend.herokuapp.com/api';

const axios = Axios.create({
    baseURL: baseURL,
});

function setHeader() {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        // delete axios.defaults.headers.common['Authorization'];
    }
}

export { axios, setHeader };

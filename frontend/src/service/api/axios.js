import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:4000/api',
});

export default axios;

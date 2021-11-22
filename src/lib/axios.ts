import Axios from 'axios';

const Host = process.env.REACT_APP_PYTHON_API_HOST;

export const axios = Axios.create({
    baseURL: Host,
});

import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export const setAuthToken = (token?: string): void => {
    if (token) httpClient.defaults.headers.common['x-auth-token'] = token;
    else delete httpClient.defaults.headers.common['x-auth-token'];
}

export default httpClient;
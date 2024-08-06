import axios from 'axios';

const app_name = `${import.meta.env.VITE_APP_NAME}`;

const axiosClient = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    baseURL: import.meta.env.VITE_API_URL
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(`${app_name}_token`)}`;

    return config;
});

export default axiosClient;

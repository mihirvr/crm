import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://crm-api-113c.onrender.com/api',
});

export default api;

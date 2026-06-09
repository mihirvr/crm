import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
=======
    baseURL: import.meta.env.VITE_API_URL || 'https://crm-api-113c.onrender.com/api',
>>>>>>> 7544f57b4298e04ffdaac69b951c38917a3b83e5
});

export default api;

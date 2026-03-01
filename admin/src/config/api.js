import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

const token = localStorage.getItem("adminToken");
if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

api.interceptors.request.use((config) => {
    const currentToken = localStorage.getItem("adminToken");
    if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

export default api;

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Product API
export const productAPI = {
    getAll: (params) => api.get('/api/products/', { params }),
    getById: (id) => api.get(`/api/products/${id}`),
    getFeatured: () => api.get('/api/products/featured'),
    create: (data) => api.post('/api/products/', data),
    update: (id, data) => api.put(`/api/products/${id}`, data),
    delete: (id) => api.delete(`/api/products/${id}`),
};

// User API
export const userAPI = {
    register: (data) => api.post('/api/users/register', data),
    login: (data) => api.post('/api/users/login', data),
    getProfile: () => api.get('/api/users/profile'),
    updateProfile: (data) => api.put('/api/users/profile', data),
};

// Cart API
export const cartAPI = {
    getCart: () => api.get('/api/cart/'),
    addToCart: (data) => api.post('/api/cart/add', data),
    updateCartItem: (id, data) => api.put(`/api/cart/${id}`, data),
    removeFromCart: (id) => api.delete(`/api/cart/${id}`),
    clearCart: () => api.delete('/api/cart/clear'),
};

// Order API
export const orderAPI = {
    getOrders: () => api.get('/api/orders/'),
    getOrderById: (id) => api.get(`/api/orders/${id}`),
    createOrder: (data) => api.post('/api/orders/create', data),
    updateOrderStatus: (id, data) => api.put(`/api/orders/${id}/status`, data),
};

export default api;

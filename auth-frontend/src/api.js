import axios from 'axios';

// Backend URL'ini buraya tanımlıyoruz
const API = axios.create({
    baseURL: 'http://localhost:9090', // Kendi Spring Boot portuna göre düzenle
});

// İŞTE SORDUĞUN BÜYÜLÜ KISIM BURASI:
// Backend'e giden her isteği yakala ve eğer token varsa Header'a "Bearer <token>" ekle
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
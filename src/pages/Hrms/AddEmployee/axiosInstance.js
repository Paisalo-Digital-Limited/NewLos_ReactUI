// src/services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://apiuat.paisalo.in:4015/admin/api'
});

// Adding the Authorization header with the token
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE1OSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTQVRJU0ggTUFVUllBICIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImRvdG5ldGRldjFAcGFpc2Fsby5pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTU5IiwiQ3JlYXRvciI6IlZIREVMSEkiLCJFbXBDb2RlIjoiUDAwMDAwMTUzNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IkphbiBTYXQgMTEgMjAyNSAwNToyODoyOSBBTSIsIm5iZiI6MTczNjQ4NjkwOSwiZXhwIjoxNzM2NTczMzA5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTg4IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE4OCJ9.AmsFu66Rfecl5cK3R7_pjBGPSeSrtIJbw87lVRR-2Ys'; // Sample Token

// Set the authorization header for every request
axiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

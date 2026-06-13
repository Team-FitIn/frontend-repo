// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://explore-arrival-headgear.ngrok-free.dev",
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fitin_token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
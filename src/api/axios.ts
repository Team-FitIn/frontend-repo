// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  // 백엔드 서버의 기본 주소입니다.
  baseURL: "https://urethane-trench-disdain.ngrok-free.dev", 
});

// 모든 API 요청이 나가기 직전에 이 로직을 거칩니다.
api.interceptors.request.use((config) => {
  // LocalStorage에서 저장된 토큰을 꺼내옵니다.
  const token = localStorage.getItem("fitin_token");
  
  // 토큰이 있다면 Header에 Authorization 항목을 추가합니다.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
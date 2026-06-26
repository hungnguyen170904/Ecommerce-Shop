import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động đính kèm Token vào mọi request gửi lên Backend
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Bắt lỗi toàn cục (Ví dụ: 401 thì tự động đăng xuất)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      // Không nên dùng window.location ở đây trong app lớn, nhưng để demo luồng auth thì tạm ổn
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
         window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

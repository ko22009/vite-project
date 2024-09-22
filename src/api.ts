import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик для добавления токена авторизации в заголовки запроса
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовки
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехватчик для обработки ошибок (например, 401 — неавторизован)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();

    // Обработка ошибки 401 (Unauthorized)
    if (error.response.status === 401) {
      try {
        // Попытка обновить токен
        await authStore.refreshToken();
        // Повторный запрос с новым токеном
        return apiClient(error.config);
      } catch (refreshError) {
        // Логаут и перенаправление на страницу логина, если обновление токена не удалось
        await authStore.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

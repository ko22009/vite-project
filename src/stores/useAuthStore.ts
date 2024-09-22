// stores/auth.ts
import { defineStore } from 'pinia';
import apiClient from '@/api';
import router from '@/router';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
  }),

  actions: {
    // Логин пользователя
    async login(credentials: { email: string; password: string }) {
      try {
        const response = await apiClient.get('/user/login', credentials);

        this.accessToken = response.data.accessToken;
        this.refreshToken = response.data.refreshToken;
        this.isAuthenticated = true;

        // Сохраняем токены в localStorage
        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('refreshToken', this.refreshToken);

        // Загружаем информацию о пользователе
        await this.fetchUser();

        // Перенаправляем на защищённую страницу
        router.push({ name: 'Dashboard' });
      } catch (error) {
        console.error('Ошибка при авторизации:', error);
      }
    },

    // Логаут пользователя
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      this.user = null;

      // Очищаем токены в localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Перенаправляем на страницу логина
      router.push({ name: 'Login' });
    },

    // Обновление access-токена с помощью refresh-токена
    async refreshToken() {
      try {
        const response = await apiClient.post('/auth/refresh', {
          refreshToken: this.refreshToken,
        });

        this.accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', this.accessToken);

        return this.accessToken;
      } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        this.logout(); // Логаут в случае ошибки
      }
    },
  },
});

import apiClient from './api.client';
import type { paths } from './api.types';

type LoginParams = paths['/user/login']['get']['parameters']['query'];

export const login = async (credentials: LoginParams) => {
  try {
    await apiClient.get('/user/login', {
      params: credentials,
    });
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
  }
};

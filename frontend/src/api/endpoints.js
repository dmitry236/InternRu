import apiClient from './client';

export const signUp = (userData) => apiClient.post('/auth/sign-up/', userData);
export const login = (credentials) => apiClient.post('/auth/token/', credentials);
export const refreshToken = (refresh) => apiClient.post('/auth/roken/refresh/', { refresh });
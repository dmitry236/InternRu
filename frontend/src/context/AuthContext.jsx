import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin, signUp as apiSignUp } from '../api/endpoints';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Функция входа
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await apiLogin(credentials);
      const { access, refresh } = response.data;
      
      // Сохраняем токены в localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // Здесь можно получить данные пользователя (если бэкенд их возвращает)
      setUser({ email: credentials.email });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Ошибка входа' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Функция регистрации
  const signUp = async (userData) => {
    setLoading(true);
    try {
      await apiSignUp(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Ошибка регистрации' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Функция выхода
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
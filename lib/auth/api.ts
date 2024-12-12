import axios from 'axios';
import { LoginCredentials, AuthResponse, ResetPasswordResponse } from './types';

const API_URL = 'http://localhost:5000/api/auth';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async forgotPassword(email: string): Promise<ResetPasswordResponse> {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  },

  async resetPassword(token: string, password: string): Promise<ResetPasswordResponse> {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, {
        token,
        password,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  },

  async logout(): Promise<void> {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  },
};
"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, type User, type LoginCredentials } from './api/auth';
import { useToast } from '@/hooks/use-toast';

interface AuthState {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (credentials) => {
        try {
          const response = await authApi.login(credentials);
          if (response.success) {
            set({ user: response.user });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },
      logout: async () => {
        try {
          await authApi.logout();
          set({ user: null });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
      forgotPassword: async (email) => {
        try {
          const response = await authApi.forgotPassword(email);
          return response.success;
        } catch (error) {
          console.error('Forgot password error:', error);
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
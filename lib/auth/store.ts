import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials } from './types';
import { authApi } from './api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  clearError: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(credentials);
          if (response.success) {
            set({ 
              user: response.user, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return true;
          }
          set({ 
            error: 'Invalid credentials', 
            isLoading: false 
          });
          return false;
        } catch (error: any) {
          set({ 
            error: error.message, 
            isLoading: false 
          });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authApi.logout();
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message, 
            isLoading: false 
          });
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.forgotPassword(email);
          set({ isLoading: false });
          return response.success;
        } catch (error: any) {
          set({ 
            error: error.message, 
            isLoading: false 
          });
          return false;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
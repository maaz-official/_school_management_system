export interface User {
  id: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  firstName: string;
  lastName: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
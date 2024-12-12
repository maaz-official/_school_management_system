import { User } from './types';

export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
} as const;

interface RouteConfig {
  path: string;
  roles: (typeof ROLES)[keyof typeof ROLES][];
}

export const protectedRoutes: RouteConfig[] = [
  // Admin routes
  { path: '/admin', roles: [ROLES.ADMIN] },
  { path: '/admin/dashboard', roles: [ROLES.ADMIN] },
  { path: '/admin/users', roles: [ROLES.ADMIN] },
  { path: '/admin/settings', roles: [ROLES.ADMIN] },

  // Teacher routes
  { path: '/teachers', roles: [ROLES.ADMIN, ROLES.TEACHER] },
  { path: '/attendance', roles: [ROLES.ADMIN, ROLES.TEACHER] },
  { path: '/grades', roles: [ROLES.ADMIN, ROLES.TEACHER] },
  { path: '/courses', roles: [ROLES.ADMIN, ROLES.TEACHER] },

  // Student routes
  { path: '/students', roles: [ROLES.ADMIN, ROLES.TEACHER] },
  { path: '/profile', roles: [ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT] },
  { path: '/assignments', roles: [ROLES.TEACHER, ROLES.STUDENT] },
  { path: '/schedule', roles: [ROLES.TEACHER, ROLES.STUDENT] },
  { path: '/messages', roles: [ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT] },
];

export const publicRoutes = [
  '/login',
  '/forgot-password',
  '/reset-password',
] as const;

export const getHomeRoute = (role: User['role']): string => {
  switch (role) {
    case ROLES.ADMIN:
      return '/admin/dashboard';
    case ROLES.TEACHER:
      return '/teachers/dashboard';
    case ROLES.STUDENT:
      return '/students/dashboard';
    default:
      return '/login';
  }
};
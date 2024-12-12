import { User } from './types';
import { protectedRoutes } from './routes';

export const hasPermission = (user: User | null, path: string): boolean => {
  if (!user) return false;

  // Find the matching route configuration
  const route = protectedRoutes.find(route => 
    path.startsWith(route.path)
  );

  // If no matching route is found, deny access
  if (!route) return false;

  // Check if the user's role is allowed for this route
  return route.roles.includes(user.role);
};
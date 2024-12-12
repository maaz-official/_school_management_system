"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/store";
import { publicRoutes, getHomeRoute } from "@/lib/auth/routes";
import { RoleGuard } from "./role-guard";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isPublicRoute = publicRoutes.some(route => 
      pathname.startsWith(route)
    );

    if (!isAuthenticated && !isPublicRoute) {
      router.push("/login");
    }

    if (isAuthenticated && isPublicRoute) {
      router.push(getHomeRoute(user?.role || 'student'));
    }
  }, [isAuthenticated, user, pathname, router]);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return <RoleGuard>{children}</RoleGuard>;
}
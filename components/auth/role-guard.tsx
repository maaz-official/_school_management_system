"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/store";
import { hasPermission } from "@/lib/auth/permissions";
import { getHomeRoute } from "@/lib/auth/routes";

interface RoleGuardProps {
  children: React.ReactNode;
}

export function RoleGuard({ children }: RoleGuardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user && !hasPermission(user, pathname)) {
      // Redirect to the appropriate home route based on role
      router.push(getHomeRoute(user.role));
    }
  }, [user, pathname, router]);

  if (!user) return null;

  return <>{children}</>;
}
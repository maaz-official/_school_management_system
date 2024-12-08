"use client";

import { useAuth } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const publicRoutes = ["/login"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }
    if (user && pathname === "/login") {
      router.push("/");
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}
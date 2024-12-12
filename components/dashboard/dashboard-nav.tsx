"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/store";
import { ROLES } from "@/lib/auth/routes";
import { 
  School, 
  Users, 
  BookOpen, 
  Calendar, 
  MessageSquare,
  Settings,
  GraduationCap,
  ClipboardCheck,
  BookMarked,
  UserCog,
  BarChart
} from "lucide-react";

const getNavItems = (role: string) => {
  const items = [
    {
      title: "Dashboard",
      href: `/${role}/dashboard`,
      icon: BarChart,
      roles: [ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT],
    },
    {
      title: "Students",
      href: "/students",
      icon: Users,
      roles: [ROLES.ADMIN, ROLES.TEACHER],
    },
    {
      title: "Teachers",
      href: "/teachers",
      icon: GraduationCap,
      roles: [ROLES.ADMIN],
    },
    {
      title: "Courses",
      href: "/courses",
      icon: BookOpen,
      roles: [ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT],
    },
    {
      title: "Attendance",
      href: "/attendance",
      icon: ClipboardCheck,
      roles: [ROLES.ADMIN, ROLES.TEACHER],
    },
    {
      title: "Assignments",
      href: "/assignments",
      icon: BookMarked,
      roles: [ROLES.TEACHER, ROLES.STUDENT],
    },
    {
      title: "Schedule",
      href: "/schedule",
      icon: Calendar,
      roles: [ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT],
    },
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
      roles: [ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT],
    },
    {
      title: "Profile",
      href: "/profile",
      icon: UserCog,
      roles: [ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      roles: [ROLES.ADMIN],
    },
  ];

  return items.filter(item => item.roles.includes(role));
};

interface DashboardNavProps {
  isMobile?: boolean;
  onNavClick?: () => void;
}

export function DashboardNav({ isMobile, onNavClick }: DashboardNavProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const navItems = getNavItems(user?.role || 'student');

  return (
    <nav className={cn(
      "flex h-full w-full flex-col bg-card px-3 py-4",
      !isMobile && "hidden lg:flex h-[calc(100vh-4rem)] w-64 border-r"
    )}>
      <div className="mb-8 px-4 flex items-center gap-2">
        <School className="h-6 w-6" />
        <h2 className="text-2xl font-bold tracking-tight">EduManager</h2>
      </div>
      <div className="space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              pathname === item.href && "bg-secondary"
            )}
            asChild
            onClick={onNavClick}
          >
            <Link href={item.href}>
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
}
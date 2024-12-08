"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  School, 
  Users, 
  BookOpen, 
  Calendar, 
  MessageSquare,
  Settings,
  GraduationCap
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: School,
  },
  {
    title: "Students",
    href: "/students",
    icon: Users,
  },
  {
    title: "Teachers",
    href: "/teachers",
    icon: GraduationCap,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface DashboardNavProps {
  isMobile?: boolean;
  onNavClick?: () => void;
}

export function DashboardNav({ isMobile, onNavClick }: DashboardNavProps) {
  const pathname = usePathname();

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
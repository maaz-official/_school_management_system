"use client";

import { cn } from "@/lib/utils";
import { DashboardNav } from "./dashboard-nav";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1">
          <div className="container mx-auto p-8">
            <div className={cn("mx-auto max-w-7xl", className)} {...props}>
              {children}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
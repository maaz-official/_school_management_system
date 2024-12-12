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
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <DashboardNav />
        <main className="flex-1 bg-muted/30">
          <div className="container mx-auto p-6 lg:p-8">
            <div className={cn("mx-auto max-w-7xl space-y-6", className)} {...props}>
              {children}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
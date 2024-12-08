"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { UpcomingEvents } from "@/components/dashboard/upcoming-events";

export default function Home() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Dashboard" 
        text="Welcome to the School Management System"
      />
      <div className="grid gap-6">
        <OverviewStats />
        <div className="grid gap-6 md:grid-cols-2">
          <UpcomingEvents />
          <RecentActivity />
        </div>
      </div>
    </DashboardShell>
  );
}
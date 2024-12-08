"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TeacherList } from "@/components/teachers/teacher-list";

export default function TeachersPage() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Teachers" 
        text="Manage teacher profiles and assignments"
      />
      <TeacherList />
    </DashboardShell>
  );
}
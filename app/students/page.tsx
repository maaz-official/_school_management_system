"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StudentList } from "@/components/students/student-list";

export default function StudentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Students" 
        text="Manage student records and information"
      />
      <StudentList />
    </DashboardShell>
  );
}
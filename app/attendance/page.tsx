"use client";  // This marks the component as a Client Component

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AttendanceTable } from "@/components/attendance/attendance-table";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { studentApi, Student } from "@/lib/api/students";

export default function AttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);  // Specify the type here
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await studentApi.getAllStudents();
        setStudents(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch students",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [toast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Attendance Management" 
        text="Mark and view student attendance"
      />
      <Card className="p-6">
        <AttendanceTable 
          students={students}
          classId="default-class" // Replace with actual class ID
        />
      </Card>
    </DashboardShell>
  );
}

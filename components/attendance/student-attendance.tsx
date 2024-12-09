"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceStats } from "./attendance-stats";
import { attendanceApi } from "@/lib/api/attendance";
import { useToast } from "@/hooks/use-toast";

interface StudentAttendanceProps {
  studentId: string;
}

export function StudentAttendance({ studentId }: StudentAttendanceProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceData, setAttendanceData] = useState<any>({
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    lateDays: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

        const records = await attendanceApi.getStudentAttendance(studentId, {
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
        });

        const stats = records.reduce(
          (acc, record) => {
            acc.totalDays++;
            if (record.status === "present") acc.presentDays++;
            if (record.status === "absent") acc.absentDays++;
            if (record.status === "late") acc.lateDays++;
            return acc;
          },
          { totalDays: 0, presentDays: 0, absentDays: 0, lateDays: 0 }
        );

        setAttendanceData(stats);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch attendance records",
          variant: "destructive",
        });
      }
    };

    fetchAttendance();
  }, [studentId, selectedDate, toast]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => setSelectedDate(date || new Date())}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <AttendanceStats {...attendanceData} />
    </div>
  );
}
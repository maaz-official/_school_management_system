"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { attendanceApi } from "@/lib/api/attendance";

interface Student {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  rollNumber: string;
}

interface AttendanceTableProps {
  students: Student[];
  classId: string;
}

export function AttendanceTable({ students, classId }: AttendanceTableProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const loadAttendance = async () => {
    try {
      setIsLoading(true);
      const data = await attendanceApi.getBulkAttendance({
        classId,
        date: format(date, "yyyy-MM-dd"),
      });
      
      const attendanceMap: Record<string, string> = {};
      data.forEach((record) => {
        attendanceMap[record.studentId] = record.status;
      });
      setAttendance(attendanceMap);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load attendance records",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAttendance = async (studentId: string, status: string) => {
    try {
      await attendanceApi.markAttendance({
        studentId,
        date: format(date, "yyyy-MM-dd"),
        status: status as "present" | "absent" | "late",
      });
      
      setAttendance((prev) => ({
        ...prev,
        [studentId]: status,
      }));
      
      toast({
        title: "Success",
        description: "Attendance marked successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark attendance",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate || new Date());
                loadAttendance();
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>
                  {student.userId.firstName} {student.userId.lastName}
                </TableCell>
                <TableCell>
                  <Select
                    value={attendance[student._id] || ""}
                    onValueChange={(value) => markAttendance(student._id, value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Mark attendance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
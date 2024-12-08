"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { teacherApi, type Teacher } from "@/lib/api/teachers";
import { CreateTeacherDialog } from "./create-teacher-dialog";

export function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTeachers = async () => {
    try {
      const data = await teacherApi.getAllTeachers();
      setTeachers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch teachers",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDeleteTeacher = async (id: string) => {
    try {
      await teacherApi.deleteTeacher(id);
      toast({
        title: "Success",
        description: "Teacher deleted successfully",
      });
      fetchTeachers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete teacher",
        variant: "destructive",
      });
    }
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.userId.firstName.toLowerCase().includes(search.toLowerCase()) ||
      teacher.userId.lastName.toLowerCase().includes(search.toLowerCase()) ||
      teacher.userId.email.toLowerCase().includes(search.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      teacher.subjects.some(subject =>
        subject.toLowerCase().includes(search.toLowerCase())
      )
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              placeholder="Search teachers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[300px] pl-8"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <CreateTeacherDialog onSuccess={fetchTeachers} />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Classes</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher._id}>
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {teacher.userId.firstName} {teacher.userId.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {teacher.userId.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{teacher.employeeId}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.classes.map((cls, index) => (
                      <Badge key={index} variant="outline">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{teacher.experience}</TableCell>
                <TableCell>{teacher.contactNumber}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Pencil className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2 text-destructive"
                        onClick={() => handleDeleteTeacher(teacher._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
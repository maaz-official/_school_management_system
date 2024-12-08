"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { teacherApi } from "@/lib/api/teachers";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const teacherSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  classes: z.array(z.string()).min(1, "At least one class is required"),
  qualification: z.string().min(2, "Qualification is required"),
  specialization: z.string().min(2, "Specialization is required"),
  experience: z.string().min(1, "Experience is required"),
  contactNumber: z.string().min(10, "Valid contact number is required"),
  address: z.string().min(5, "Address is required"),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

interface CreateTeacherDialogProps {
  onSuccess: () => void;
}

export function CreateTeacherDialog({ onSuccess }: CreateTeacherDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newClass, setNewClass] = useState("");
  const { toast } = useToast();

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      employeeId: "",
      subjects: [],
      classes: [],
      qualification: "",
      specialization: "",
      experience: "",
      contactNumber: "",
      address: "",
    },
  });

  const onSubmit = async (data: TeacherFormValues) => {
    setIsLoading(true);
    try {
      await teacherApi.createTeacher(data);
      toast({
        title: "Success",
        description: "Teacher created successfully",
      });
      setOpen(false);
      form.reset();
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create teacher",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSubject = () => {
    if (newSubject.trim()) {
      const currentSubjects = form.getValues("subjects");
      form.setValue("subjects", [...currentSubjects, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const addClass = () => {
    if (newClass.trim()) {
      const currentClasses = form.getValues("classes");
      form.setValue("classes", [...currentClasses, newClass.trim()]);
      setNewClass("");
    }
  };

  const removeSubject = (index: number) => {
    const currentSubjects = form.getValues("subjects");
    form.setValue(
      "subjects",
      currentSubjects.filter((_, i) => i !== index)
    );
  };

  const removeClass = (index: number) => {
    const currentClasses = form.getValues("classes");
    form.setValue(
      "classes",
      currentClasses.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Teacher
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Employee ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="subjects"
                render={() => (
                  <FormItem>
                    <FormLabel>Subjects</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add subject"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSubject()}
                      />
                      <Button type="button" onClick={addSubject}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.watch("subjects").map((subject, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeSubject(index)}
                        >
                          {subject} ×
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="classes"
                render={() => (
                  <FormItem>
                    <FormLabel>Classes</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add class"
                        value={newClass}
                        onChange={(e) => setNewClass(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addClass()}
                      />
                      <Button type="button" onClick={addClass}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.watch("classes").map((cls, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeClass(index)}
                        >
                          {cls} ×
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualification</FormLabel>
                    <FormControl>
                      <Input placeholder="Qualification" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <FormControl>
                      <Input placeholder="Specialization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (years)</FormLabel>
                    <FormControl>
                      <Input placeholder="Years of experience" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Teacher"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
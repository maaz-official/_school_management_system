"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, Trophy } from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "1,234",
    icon: Users,
    description: "Active students enrolled",
  },
  {
    title: "Teachers",
    value: "64",
    icon: GraduationCap,
    description: "Professional educators",
  },
  {
    title: "Courses",
    value: "48",
    icon: BookOpen,
    description: "Available courses",
  },
  {
    title: "Achievement Rate",
    value: "94%",
    icon: Trophy,
    description: "Student success rate",
  },
];

interface OverviewStatsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function OverviewStats({ className, ...props }: OverviewStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" {...props}>
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-full">
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
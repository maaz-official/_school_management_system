"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AttendanceStatsProps {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
}

export function AttendanceStats({
  totalDays,
  presentDays,
  absentDays,
  lateDays,
}: AttendanceStatsProps) {
  const presentPercentage = (presentDays / totalDays) * 100;
  const absentPercentage = (absentDays / totalDays) * 100;
  const latePercentage = (lateDays / totalDays) * 100;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Present</CardTitle>
          <div className="text-green-600 font-bold">{presentPercentage.toFixed(1)}%</div>
        </CardHeader>
        <CardContent>
          <Progress value={presentPercentage} className="bg-green-100" />
          <p className="text-xs text-muted-foreground mt-2">
            {presentDays} out of {totalDays} days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Absent</CardTitle>
          <div className="text-red-600 font-bold">{absentPercentage.toFixed(1)}%</div>
        </CardHeader>
        <CardContent>
          <Progress value={absentPercentage} className="bg-red-100" />
          <p className="text-xs text-muted-foreground mt-2">
            {absentDays} out of {totalDays} days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Late</CardTitle>
          <div className="text-yellow-600 font-bold">{latePercentage.toFixed(1)}%</div>
        </CardHeader>
        <CardContent>
          <Progress value={latePercentage} className="bg-yellow-100" />
          <p className="text-xs text-muted-foreground mt-2">
            {lateDays} out of {totalDays} days
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
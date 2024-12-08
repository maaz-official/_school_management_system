"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    user: "John Smith",
    action: "submitted assignment",
    subject: "Mathematics",
    time: "5 minutes ago",
    type: "assignment",
  },
  {
    user: "Sarah Johnson",
    action: "joined class",
    subject: "Physics",
    time: "10 minutes ago",
    type: "class",
  },
  {
    user: "Mike Wilson",
    action: "posted announcement",
    subject: "Chemistry",
    time: "15 minutes ago",
    type: "announcement",
  },
];

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "assignment":
      return "default";
    case "class":
      return "secondary";
    case "announcement":
      return "outline";
    default:
      return "default";
  }
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user}
                  <span className="text-muted-foreground"> {activity.action}</span>
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant={getBadgeVariant(activity.type)}>
                {activity.subject}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
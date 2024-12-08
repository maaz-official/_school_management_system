"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const events = [
  {
    title: "Parent-Teacher Meeting",
    date: "March 15, 2024",
    time: "2:00 PM",
  },
  {
    title: "Science Fair",
    date: "March 20, 2024",
    time: "9:00 AM",
  },
  {
    title: "Sports Day",
    date: "March 25, 2024",
    time: "8:00 AM",
  },
];

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.title}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {event.date} at {event.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
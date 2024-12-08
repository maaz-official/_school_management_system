export const students = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "student@example.com",
    grade: "10th",
    attendance: "95%",
    performance: "A",
    subjects: ["Mathematics", "Physics", "Chemistry", "English"],
  },
  // Add more student data as needed
];

export const teachers = [
  {
    id: 1,
    name: "John Smith",
    email: "teacher@example.com",
    department: "Science",
    subjects: ["Physics", "Chemistry"],
    experience: "8 years",
  },
  // Add more teacher data as needed
];

export const courses = [
  {
    id: 1,
    name: "Advanced Mathematics",
    teacher: "John Smith",
    schedule: "Mon, Wed, Fri - 9:00 AM",
    students: 25,
    room: "301",
  },
  // Add more course data as needed
];

export const events = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    date: "2024-03-15",
    time: "14:00",
    location: "Main Hall",
    description: "Quarterly parent-teacher meeting for grade 10",
  },
  // Add more events as needed
];

export const activities = [
  {
    id: 1,
    user: "John Smith",
    action: "submitted assignment",
    subject: "Mathematics",
    timestamp: new Date().toISOString(),
    type: "assignment",
  },
  // Add more activities as needed
];
export interface Student {
  id: number;
  name: string;
  email: string;
  grade: string;
  attendance: string;
  performance: string;
  status: 'Active' | 'Inactive';
}

export const students: Student[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    grade: "10th",
    attendance: "95%",
    performance: "A",
    status: "Active",
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "michael.b@example.com",
    grade: "11th",
    attendance: "88%",
    performance: "B+",
    status: "Active",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.d@example.com",
    grade: "9th",
    attendance: "92%",
    performance: "A-",
    status: "Active",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.w@example.com",
    grade: "12th",
    attendance: "85%",
    performance: "B",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    grade: "10th",
    attendance: "94%",
    performance: "A",
    status: "Active",
  },
  {
    id: 6,
    name: "Lucas Anderson",
    email: "lucas.a@example.com",
    grade: "11th",
    attendance: "89%",
    performance: "B+",
    status: "Active",
  },
];
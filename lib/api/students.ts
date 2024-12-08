import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Student {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
    email: string;
  };
  rollNumber: string;
  class: string;
  section: string;
  dateOfBirth: string;
  guardianName: string;
  guardianContact: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  class: string;
  section: string;
  dateOfBirth: string;
  guardianName: string;
  guardianContact: string;
  address: string;
}

export const studentApi = {
  async getAllStudents(): Promise<Student[]> {
    const response = await axios.get(`${API_URL}/students`);
    return response.data.data;
  },

  async getStudent(id: string): Promise<Student> {
    const response = await axios.get(`${API_URL}/students/${id}`);
    return response.data.data;
  },

  async createStudent(data: CreateStudentData): Promise<Student> {
    const response = await axios.post(`${API_URL}/students`, data);
    return response.data.data;
  },

  async updateStudent(id: string, data: Partial<CreateStudentData>): Promise<Student> {
    const response = await axios.put(`${API_URL}/students/${id}`, data);
    return response.data.data;
  },

  async deleteStudent(id: string): Promise<void> {
    await axios.delete(`${API_URL}/students/${id}`);
  },
};
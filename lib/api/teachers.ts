import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Teacher {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
    email: string;
  };
  employeeId: string;
  subjects: string[];
  classes: string[];
  qualification: string;
  specialization: string;
  experience: string;
  contactNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeacherData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  subjects: string[];
  classes: string[];
  qualification: string;
  specialization: string;
  experience: string;
  contactNumber: string;
  address: string;
}

export const teacherApi = {
  async getAllTeachers(): Promise<Teacher[]> {
    const response = await axios.get(`${API_URL}/teachers`);
    return response.data.data;
  },

  async getTeacher(id: string): Promise<Teacher> {
    const response = await axios.get(`${API_URL}/teachers/${id}`);
    return response.data.data;
  },

  async createTeacher(data: CreateTeacherData): Promise<Teacher> {
    const response = await axios.post(`${API_URL}/teachers`, data);
    return response.data.data;
  },

  async updateTeacher(id: string, data: Partial<CreateTeacherData>): Promise<Teacher> {
    const response = await axios.put(`${API_URL}/teachers/${id}`, data);
    return response.data.data;
  },

  async deleteTeacher(id: string): Promise<void> {
    await axios.delete(`${API_URL}/teachers/${id}`);
  },

  async getTeacherClasses(): Promise<string[]> {
    const response = await axios.get(`${API_URL}/teachers/classes`);
    return response.data.data;
  },
};
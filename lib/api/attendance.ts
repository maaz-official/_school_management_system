import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface AttendanceRecord {
  _id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface MarkAttendanceData {
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface BulkAttendanceQuery {
  classId: string;
  date: string;
}

export const attendanceApi = {
  async markAttendance(data: MarkAttendanceData): Promise<AttendanceRecord> {
    const response = await axios.post(`${API_URL}/attendance`, data);
    return response.data.data;
  },

  async getStudentAttendance(studentId: string, query: { 
    startDate?: string; 
    endDate?: string; 
  }): Promise<AttendanceRecord[]> {
    const response = await axios.get(`${API_URL}/attendance/${studentId}`, { params: query });
    return response.data.data;
  },

  async getBulkAttendance(query: BulkAttendanceQuery): Promise<AttendanceRecord[]> {
    const response = await axios.get(`${API_URL}/attendance/class/bulk`, { params: query });
    return response.data.data;
  },
};
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Message {
  _id: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  recipient?: string;
  group?: string;
  content: string;
  type: 'text' | 'file';
  attachments: string[];
  replyTo?: Message;
  read: {
    user: string;
    readAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export const messageApi = {
  async sendMessage(data: FormData): Promise<Message> {
    const response = await axios.post(`${API_URL}/messages`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  async getConversation(userId: string, page = 1, limit = 50): Promise<Message[]> {
    const response = await axios.get(`${API_URL}/messages/conversation/${userId}`, {
      params: { page, limit },
    });
    return response.data.data;
  },

  async getGroupMessages(groupId: string, page = 1, limit = 50): Promise<Message[]> {
    const response = await axios.get(`${API_URL}/messages/group/${groupId}`, {
      params: { page, limit },
    });
    return response.data.data;
  },

  async markAsRead(messageId: string): Promise<void> {
    await axios.post(`${API_URL}/messages/${messageId}/read`);
  },
};
import axios, { AxiosResponse } from 'axios';
import { WebsiteIdea, CreateWebsiteIdeaRequest } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const websiteIdeaApi = {
  // Create a new website idea
  create: async (data: CreateWebsiteIdeaRequest): Promise<WebsiteIdea> => {
    const response: AxiosResponse<WebsiteIdea> = await api.post('/api/website-ideas', data);
    return response.data;
  },

  // Get all website ideas
  getAll: async (): Promise<WebsiteIdea[]> => {
    const response: AxiosResponse<WebsiteIdea[]> = await api.get('/api/website-ideas');
    return response.data;
  },

  // Get a single website idea by ID
  getById: async (id: string): Promise<WebsiteIdea> => {
    const response: AxiosResponse<WebsiteIdea> = await api.get(`/api/website-ideas/${id}`);
    return response.data;
  },

  // Delete a website idea
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/website-ideas/${id}`);
  },
};

export default api;

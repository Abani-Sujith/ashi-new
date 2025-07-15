import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Project API
export const projectAPI = {
  // Get all projects
  getAll: async () => {
    const response = await apiClient.get('/projects');
    return response.data;
  },

  // Get projects by category
  getByCategory: async (category) => {
    const response = await apiClient.get(`/projects/${category}`);
    return response.data;
  },

  // Get featured projects
  getFeatured: async () => {
    const response = await apiClient.get('/projects/featured');
    return response.data;
  },

  // Get single project
  getById: async (id) => {
    const response = await apiClient.get(`/projects/single/${id}`);
    return response.data;
  },

  // Create project
  create: async (projectData) => {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  },

  // Delete project
  delete: async (id) => {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
  },
};

// Contact API
export const contactAPI = {
  // Create contact
  create: async (contactData) => {
    const response = await apiClient.post('/contacts', contactData);
    return response.data;
  },

  // Get all contacts
  getAll: async () => {
    const response = await apiClient.get('/contacts');
    return response.data;
  },

  // Mark contact as read
  markAsRead: async (id) => {
    const response = await apiClient.patch(`/contacts/${id}/read`);
    return response.data;
  },
};

// Testimonial API
export const testimonialAPI = {
  // Get all testimonials
  getAll: async () => {
    const response = await apiClient.get('/testimonials');
    return response.data;
  },

  // Create testimonial
  create: async (testimonialData) => {
    const response = await apiClient.post('/testimonials', testimonialData);
    return response.data;
  },

  // Delete testimonial
  delete: async (id) => {
    const response = await apiClient.delete(`/testimonials/${id}`);
    return response.data;
  },
};

// Profile API
export const profileAPI = {
  // Get profile info
  get: async () => {
    const response = await apiClient.get('/profile');
    return response.data;
  },

  // Update profile
  update: async (profileData) => {
    const response = await apiClient.patch('/profile', profileData);
    return response.data;
  },

  // Increment CV download count
  incrementCVDownload: async () => {
    const response = await apiClient.post('/profile/cv-download');
    return response.data;
  },
};

// Health check
export const healthCheck = async () => {
  const response = await apiClient.get('/');
  return response.data;
};

export default apiClient;
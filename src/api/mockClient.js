import { mockBlogPosts, mockCourses, mockResources, mockUserProgress, mockUsers } from '../data/mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('luxury_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// Helper for fetch with fallback
const fetchWithFallback = async (url, options = {}, fallbackData) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (error) {
    console.warn(`API Error at ${url}, falling back to mock data:`, error);
    return fallbackData;
  }
};

export const mockClient = {
  entities: {
    BlogPost: {
      filter: async (filters) => {
        const posts = await fetchWithFallback(`${API_URL}/blog-posts?slug=${filters.slug || ''}`, {}, mockBlogPosts);
        return Array.isArray(posts) ? posts.filter(p => !filters.slug || p.slug === filters.slug) : [];
      },
      list: async () => {
        return fetchWithFallback(`${API_URL}/blog-posts`, {}, mockBlogPosts);
      },
      get: async (id) => {
        const posts = await fetchWithFallback(`${API_URL}/blog-posts`, {}, mockBlogPosts);
        return Array.isArray(posts) ? posts.find(p => p.id === id) : null;
      }
    },
    Course: {
      filter: async () => {
        return fetchWithFallback(`${API_URL}/courses`, {}, mockCourses);
      },
      get: async (id) => {
        const courses = await fetchWithFallback(`${API_URL}/courses`, {}, mockCourses);
        return Array.isArray(courses) ? courses.find(c => c.id === id) : null;
      }
    },
    Resource: {
      list: async () => {
        return fetchWithFallback(`${API_URL}/resources`, {}, mockResources);
      }
    },
    UserProgress: {
      filter: async () => {
        const progress = await fetchWithFallback(`${API_URL}/progress`, { headers: getAuthHeaders() }, mockUserProgress);
        return Array.isArray(progress) ? progress : [];
      },
      update: async (courseId, lessonId) => {
        return fetchWithFallback(`${API_URL}/progress`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ courseId, lessonId })
        }, mockUserProgress);
      }
    }
  },
  auth: {
    isAuthenticated: async () => !!localStorage.getItem('luxury_token') || !!localStorage.getItem('mockUser'),
    me: async () => {
      try {
        const response = await fetch(`${API_URL}/auth/me`, { headers: getAuthHeaders() });
        if (!response.ok) {
          localStorage.removeItem('luxury_token');
          throw new Error('Auth failed');
        }
        return await response.json();
      } catch (e) {
        return JSON.parse(localStorage.getItem('mockUser') || 'null');
      }
    },
    login: async (email, password) => {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('luxury_token', data.token);
          localStorage.setItem('mockUser', JSON.stringify(data.user));
          return data.user;
        }
        throw new Error(data.error || 'Login failed');
      } catch (error) {
        // Fallback to local user check
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          localStorage.setItem('mockUser', JSON.stringify(userWithoutPassword));
          return userWithoutPassword;
        }
        throw new Error("Invalid credentials (Backend unreachabe and local match failed)");
      }
    },
    logout: () => {
      localStorage.removeItem('luxury_token');
      localStorage.removeItem('mockUser');
      window.location.href = '/login';
    }
  }
};

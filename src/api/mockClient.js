const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('luxury_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const mockClient = {
  entities: {
    BlogPost: {
      filter: async (filters) => {
        const response = await fetch(`${API_URL}/blog-posts?slug=${filters.slug || ''}`);
        return response.json();
      },
      list: async () => {
        const response = await fetch(`${API_URL}/blog-posts`);
        return response.json();
      },
      get: async (id) => {
        const response = await fetch(`${API_URL}/blog-posts/${id}`);
        return response.json();
      }
    },
    Course: {
      filter: async () => {
        const response = await fetch(`${API_URL}/courses`);
        return response.json();
      },
      get: async (id) => {
        const response = await fetch(`${API_URL}/courses/${id}`);
        return response.json();
      }
    },
    Resource: {
      list: async () => {
        const response = await fetch(`${API_URL}/resources`);
        return response.json();
      }
    },
    UserProgress: {
      filter: async () => {
        const response = await fetch(`${API_URL}/progress`, {
          headers: getAuthHeaders()
        });
        return response.json();
      },
      update: async (courseId, lessonId) => {
        const response = await fetch(`${API_URL}/progress`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ courseId, lessonId })
        });
        return response.json();
      }
    }
  },
  auth: {
    isAuthenticated: async () => !!localStorage.getItem('luxury_token'),
    me: async () => {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        localStorage.removeItem('luxury_token');
        return null;
      }
      return response.json();
    },
    login: async (email, password) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('luxury_token', data.token);
      localStorage.setItem('mockUser', JSON.stringify(data.user));
      return data.user;
    },
    logout: () => {
      localStorage.removeItem('luxury_token');
      localStorage.removeItem('mockUser');
      window.location.href = '/login';
    }
  }
};

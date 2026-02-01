import { mockBlogPosts, mockCourses, mockResources, mockUserProgress } from '../data/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockClient = {
  entities: {
    BlogPost: {
      filter: async (filters) => {
        await delay(300);
        return mockBlogPosts.filter(p => !filters.slug || p.slug === filters.slug);
      },
      list: async () => mockBlogPosts
    },
    Course: {
      filter: async () => mockCourses
    },
    Resource: {
      list: async () => mockResources
    },
    UserProgress: {
      filter: async () => mockUserProgress
    }
  },
  auth: {
    isAuthenticated: async () => !!localStorage.getItem('mockUser'),
    me: async () => JSON.parse(localStorage.getItem('mockUser') || 'null'),
    redirectToLogin: () => {
      localStorage.setItem('mockUser', JSON.stringify({ email: "demo@example.com", full_name: "Demo" }));
      window.location.reload();
    },
    logout: () => {
      localStorage.removeItem('mockUser');
      window.location.href = '/';
    }
  }
};

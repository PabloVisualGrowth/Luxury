import { mockBlogPosts, mockCourses, mockResources, mockUserProgress } from '../data/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get/set from localStorage
const getStorageItem = (key, fallback) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : fallback;
};

const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const mockClient = {
  entities: {
    BlogPost: {
      filter: async (filters) => {
        await delay(300);
        return mockBlogPosts.filter(p => !filters.slug || p.slug === filters.slug);
      },
      list: async () => {
        await delay(300);
        return mockBlogPosts;
      },
      get: async (id) => {
        await delay(300);
        return mockBlogPosts.find(p => p.id === id);
      }
    },
    Course: {
      filter: async () => {
        await delay(300);
        return mockCourses;
      },
      get: async (id) => {
        await delay(300);
        return mockCourses.find(c => c.id === id);
      }
    },
    Resource: {
      list: async () => {
        await delay(300);
        return mockResources;
      }
    },
    UserProgress: {
      filter: async () => {
        await delay(300);
        return getStorageItem('userProgress', mockUserProgress);
      },
      update: async (courseId, lessonId) => {
        await delay(300);
        const progress = getStorageItem('userProgress', mockUserProgress);
        const courseIndex = progress.findIndex(p => p.courseId === courseId);

        if (courseIndex > -1) {
          if (!progress[courseIndex].completedLessons.includes(lessonId)) {
            progress[courseIndex].completedLessons.push(lessonId);
            progress[courseIndex].lastAccessed = new Date().toISOString();
          }
        } else {
          progress.push({
            courseId,
            completedLessons: [lessonId],
            lastAccessed: new Date().toISOString()
          });
        }

        setStorageItem('userProgress', progress);
        return progress;
      }
    }
  },
  auth: {
    isAuthenticated: async () => !!localStorage.getItem('mockUser'),
    me: async () => JSON.parse(localStorage.getItem('mockUser') || 'null'),
    redirectToLogin: () => {
      localStorage.setItem('mockUser', JSON.stringify({
        id: "u1",
        email: "catherine.sonolet@sustainable-luxury.info",
        full_name: "Catherine Sonolet",
        role: "Training Consultant"
      }));
      window.location.reload();
    },
    logout: () => {
      localStorage.removeItem('mockUser');
      window.location.href = '/';
    }
  }
};

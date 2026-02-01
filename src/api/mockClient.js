import { mockBlogPosts, mockCourses, mockResources, mockUserProgress, mockUsers } from '../data/mockData';

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
        const user = JSON.parse(localStorage.getItem('mockUser') || 'null');
        if (!user) return [];
        return getStorageItem(`userProgress_${user.id}`, mockUserProgress);
      },
      update: async (courseId, lessonId) => {
        await delay(300);
        const user = JSON.parse(localStorage.getItem('mockUser') || 'null');
        if (!user) throw new Error("Unauthorized");

        const storageKey = `userProgress_${user.id}`;
        const progress = getStorageItem(storageKey, mockUserProgress);
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

        setStorageItem(storageKey, progress);
        return progress;
      }
    }
  },
  auth: {
    isAuthenticated: async () => !!localStorage.getItem('mockUser'),
    me: async () => JSON.parse(localStorage.getItem('mockUser') || 'null'),
    login: async (email, password) => {
      await delay(500);
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('mockUser', JSON.stringify(userWithoutPassword));
        return userWithoutPassword;
      }
      throw new Error("Invalid email or password");
    },
    logout: () => {
      localStorage.removeItem('mockUser');
      window.location.href = '/login';
    }
  }
};

import { create } from 'zustand';
import { User, Course, Progress, LearningStats } from '../types';
import { mockUser, mockCourses, mockProgress, mockLearningStats } from '../data/mockData';

interface AppState {
  user: User | null;
  courses: Course[];
  progress: Progress[];
  stats: LearningStats;
  isLoggedIn: boolean;
  checkInToday: boolean;
  
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
  updateProgress: (courseId: string, moduleId: string, completedQuestions: number, totalQuestions: number, score: number) => void;
  checkIn: () => void;
  getCourseById: (id: string) => Course | undefined;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: mockUser,
  courses: mockCourses,
  progress: mockProgress,
  stats: mockLearningStats,
  isLoggedIn: true,
  checkInToday: false,

  login: (email, password) => {
    set({ user: mockUser, isLoggedIn: true });
  },

  register: (email, password, name) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };
    set({ user: newUser, isLoggedIn: true });
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });
  },

  updateProgress: (courseId, moduleId, completedQuestions, totalQuestions, score) => {
    set((state) => ({
      progress: [...state.progress, {
        id: Date.now().toString(),
        userId: state.user?.id || '',
        courseId,
        moduleId,
        completedQuestions,
        totalQuestions,
        score,
        lastAccessed: new Date().toISOString(),
      }],
      stats: {
        ...state.stats,
        totalMinutes: state.stats.totalMinutes + Math.floor(totalQuestions * 2),
        totalWords: state.stats.totalWords + completedQuestions,
      },
    }));
  },

  checkIn: () => {
    set((state) => ({
      checkInToday: true,
      stats: {
        ...state.stats,
        consecutiveDays: state.stats.consecutiveDays + 1,
        totalDays: state.stats.totalDays + 1,
      },
    }));
  },

  getCourseById: (id) => {
    return get().courses.find(course => course.id === id);
  },
}));

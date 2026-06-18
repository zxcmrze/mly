export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: number;
  imageUrl: string;
  createdAt: string;
  modules: Module[];
}

export interface Module {
  id: string;
  courseId: string;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening';
  title: string;
  order: number;
  questions: Question[];
}

export interface Question {
  id: string;
  moduleId: string;
  question: string;
  correctAnswer: string;
  options?: string[];
  audioUrl?: string;
  hint?: string;
  example?: string;
}

export interface Progress {
  id: string;
  userId: string;
  courseId: string;
  moduleId: string;
  completedQuestions: number;
  totalQuestions: number;
  score: number;
  completedAt?: string;
  lastAccessed: string;
}

export interface DailyCheckIn {
  date: string;
  completed: boolean;
  points: number;
}

export interface LearningStats {
  totalDays: number;
  consecutiveDays: number;
  totalMinutes: number;
  completedCourses: number;
  totalWords: number;
  accuracy: number;
}

export type ModuleType = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

export type AnswerResult = 'correct' | 'wrong' | null;

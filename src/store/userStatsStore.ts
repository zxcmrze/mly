import { create } from 'zustand';

interface UserStats {
  // 学习天数相关
  consecutiveDays: number;        // 连续打卡天数
  totalDays: number;             // 总学习天数
  lastCheckInDate: string | null; // 上次打卡日期 (格式: YYYY-MM-DD)
  
  // 学习时长相关
  totalMinutes: number;           // 总学习分钟数
  todayMinutes: number;            // 今日学习分钟数
  lastStudyDate: string | null;   // 上次学习日期
  
  // 课程进度相关
  completedCourses: number;        // 已完成课程数
  completedModules: number;         // 已完成模块数
  totalWordsLearned: number;       // 已学单词数
  
  // 计算属性（从已完成的题目计算）
  accuracy: number;                // 正确率
  correctAnswers: number;           // 正确答案数
  totalAnswers: number;             // 总答题数
}

interface UserStatsState extends UserStats {
  // Actions
  checkIn: () => void;              // 打卡
  addStudyTime: (minutes: number) => void;  // 添加学习时间
  completeModule: (courseId: string, moduleId: string, correctCount: number, totalCount: number) => void;  // 完成模块
  completeCourse: (courseId: string) => void;  // 完成课程
  recordAnswer: (isCorrect: boolean) => void;  // 记录答题结果
  resetTodayMinutes: () => void;    // 重置今日分钟数（每天调用一次）
  loadFromStorage: () => void;      // 从 localStorage 加载数据
  saveToStorage: () => void;        // 保存到 localStorage
  getAllStats: () => UserStats;      // 获取所有统计数据
}

const STORAGE_KEY = 'user_learning_stats';

// 获取今天的日期字符串
const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

// 获取昨天的日期字符串
const getYesterdayString = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
};

// 获取初始状态
const getInitialState = (): UserStats => {
  return {
    consecutiveDays: 0,
    totalDays: 0,
    lastCheckInDate: null,
    totalMinutes: 0,
    todayMinutes: 0,
    lastStudyDate: null,
    completedCourses: 0,
    completedModules: 0,
    totalWordsLearned: 0,
    accuracy: 0,
    correctAnswers: 0,
    totalAnswers: 0,
  };
};

// 从 localStorage 加载数据
const loadStatsFromStorage = (): UserStats => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // 检查是否是今天，如果是则保留 todayMinutes，否则重置
      const today = getTodayString();
      if (parsed.lastStudyDate !== today) {
        parsed.todayMinutes = 0;
      }
      return { ...getInitialState(), ...parsed };
    }
  } catch (error) {
    console.error('Failed to load stats from storage:', error);
  }
  return getInitialState();
};

export const useUserStatsStore = create<UserStatsState>((set, get) => ({
  ...loadStatsFromStorage(),
  
  // 打卡
  checkIn: () => {
    const state = get();
    const today = getTodayString();
    const yesterday = getYesterdayString();
    
    // 如果今天已经打卡，不再重复打卡
    if (state.lastCheckInDate === today) {
      return;
    }
    
    let newConsecutiveDays: number;
    
    if (state.lastCheckInDate === yesterday) {
      // 昨天已打卡，今天继续，连续天数 +1
      newConsecutiveDays = state.consecutiveDays + 1;
    } else if (state.lastCheckInDate === null) {
      // 第一次打卡
      newConsecutiveDays = 1;
    } else {
      // 超过一天没打卡，重置连续天数
      newConsecutiveDays = 1;
    }
    
    set({
      consecutiveDays: newConsecutiveDays,
      totalDays: state.totalDays + 1,
      lastCheckInDate: today,
    });
    
    get().saveToStorage();
  },
  
  // 添加学习时间
  addStudyTime: (minutes: number) => {
    const today = getTodayString();
    set((state) => {
      const newTodayMinutes = state.lastStudyDate === today 
        ? state.todayMinutes + minutes 
        : minutes;
      
      return {
        totalMinutes: state.totalMinutes + minutes,
        todayMinutes: newTodayMinutes,
        lastStudyDate: today,
      };
    });
    
    get().saveToStorage();
  },
  
  // 完成模块
  completeModule: (courseId: string, moduleId: string, correctCount: number, totalCount: number) => {
    set((state) => ({
      completedModules: state.completedModules + 1,
      totalWordsLearned: state.totalWordsLearned + totalCount,
      totalAnswers: state.totalAnswers + totalCount,
      correctAnswers: state.correctAnswers + correctCount,
      accuracy: Math.round(((state.correctAnswers + correctCount) / (state.totalAnswers + totalCount)) * 100),
    }));
    
    get().saveToStorage();
  },
  
  // 完成课程
  completeCourse: (courseId: string) => {
    set((state) => ({
      completedCourses: state.completedCourses + 1,
    }));
    
    get().saveToStorage();
  },
  
  // 记录答题结果
  recordAnswer: (isCorrect: boolean) => {
    set((state) => {
      const newTotalAnswers = state.totalAnswers + 1;
      const newCorrectAnswers = state.correctAnswers + (isCorrect ? 1 : 0);
      const newAccuracy = Math.round((newCorrectAnswers / newTotalAnswers) * 100);
      
      return {
        totalAnswers: newTotalAnswers,
        correctAnswers: newCorrectAnswers,
        accuracy: newAccuracy,
      };
    });
    
    get().saveToStorage();
  },
  
  // 重置今日分钟数（每天调用一次）
  resetTodayMinutes: () => {
    const today = getTodayString();
    set((state) => {
      if (state.lastStudyDate !== today) {
        return { todayMinutes: 0 };
      }
      return {};
    });
  },
  
  // 从 localStorage 加载数据
  loadFromStorage: () => {
    const saved = loadStatsFromStorage();
    set(saved);
  },
  
  // 保存到 localStorage
  saveToStorage: () => {
    try {
      const state = get();
      const dataToSave: UserStats = {
        consecutiveDays: state.consecutiveDays,
        totalDays: state.totalDays,
        lastCheckInDate: state.lastCheckInDate,
        totalMinutes: state.totalMinutes,
        todayMinutes: state.todayMinutes,
        lastStudyDate: state.lastStudyDate,
        completedCourses: state.completedCourses,
        completedModules: state.completedModules,
        totalWordsLearned: state.totalWordsLearned,
        accuracy: state.accuracy,
        correctAnswers: state.correctAnswers,
        totalAnswers: state.totalAnswers,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Failed to save stats to storage:', error);
    }
  },
  
  // 获取所有统计数据
  getAllStats: () => {
    const state = get();
    return {
      consecutiveDays: state.consecutiveDays,
      totalDays: state.totalDays,
      lastCheckInDate: state.lastCheckInDate,
      totalMinutes: state.totalMinutes,
      todayMinutes: state.todayMinutes,
      lastStudyDate: state.lastStudyDate,
      completedCourses: state.completedCourses,
      completedModules: state.completedModules,
      totalWordsLearned: state.totalWordsLearned,
      accuracy: state.accuracy,
      correctAnswers: state.correctAnswers,
      totalAnswers: state.totalAnswers,
    };
  },
}));

// 自动初始化：从 localStorage 加载数据
if (typeof window !== 'undefined') {
  useUserStatsStore.getState().loadFromStorage();
}

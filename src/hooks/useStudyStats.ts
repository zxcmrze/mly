import { useEffect, useRef } from 'react';
import { useUserStatsStore } from '../store/userStatsStore';

/**
 * 自定义 Hook：自动追踪学习时间
 * 当组件挂载时开始计时，每分钟自动增加学习时间
 * 
 * @param isActive - 是否正在学习（如果为 false，暂停计时）
 * @param minutesPerQuestion - 每完成一道题增加的时间（分钟），默认 0.5 分钟
 */
export const useStudyTimer = (isActive: boolean = true, minutesPerQuestion: number = 0.5) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const addStudyTime = useUserStatsStore((state) => state.addStudyTime);
  const totalMinutes = useUserStatsStore((state) => state.totalMinutes);
  const todayMinutes = useUserStatsStore((state) => state.todayMinutes);

  useEffect(() => {
    if (!isActive) {
      // 停止计时
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // 开始计时：每 30 秒增加 0.5 分钟
    intervalRef.current = setInterval(() => {
      addStudyTime(0.5);
    }, 30000); // 30秒 = 0.5分钟

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, addStudyTime]);

  return {
    totalMinutes,
    todayMinutes,
    addStudyTime,
  };
};

/**
 * 记录答题并自动增加学习时间
 * 
 * @param correctCount - 本轮正确答案数
 * @param totalCount - 本轮总题数
 * @param courseId - 课程ID
 * @param moduleId - 模块ID
 */
export const useRecordProgress = () => {
  const completeModule = useUserStatsStore((state) => state.completeModule);
  const addStudyTime = useUserStatsStore((state) => state.addStudyTime);

  const recordAndCalculate = (
    correctCount: number,
    totalCount: number,
    courseId: string,
    moduleId: string
  ) => {
    // 记录模块完成
    completeModule(courseId, moduleId, correctCount, totalCount);
    
    // 根据完成题数增加学习时间（每完成一套题约5-10分钟）
    const studyMinutes = Math.max(5, Math.ceil(totalCount * minutesPerQuestion));
    addStudyTime(studyMinutes);
  };

  return {
    recordAndCalculate,
    completeModule,
    addStudyTime,
  };
};

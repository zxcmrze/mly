import { useParams, useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import FlashCard from '../components/modules/FlashCard';
import GrammarQuiz from '../components/modules/GrammarQuiz';
import SpeakingPractice from '../components/modules/SpeakingPractice';
import ListeningExercise from '../components/modules/ListeningExercise';
import { useAppStore } from '../store/appStore';
import { ModuleType } from '../types';

export default function Learn() {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  const navigate = useNavigate();
  const { getCourseById, updateProgress } = useAppStore();

  const course = getCourseById(courseId || '');
  // 使用 moduleId 精确查找对应模块
  const currentModule = course?.modules.find(m => m.id === moduleId);

  if (!course || !currentModule) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😢</div>
        <p className="text-gray-500 font-cute">课程或模块不存在</p>
      </div>
    );
  }

  const handleComplete = (correctCount: number) => {
    updateProgress(
      courseId || '',
      currentModule.id,
      correctCount,
      currentModule.questions.length,
      Math.round((correctCount / currentModule.questions.length) * 100)
    );
  };

  const renderModule = () => {
    // 根据模块类型渲染对应的学习组件
    switch (currentModule.type) {
      case 'vocabulary':
        return <FlashCard questions={currentModule.questions} onComplete={handleComplete} />;
      case 'grammar':
        return <GrammarQuiz questions={currentModule.questions} onComplete={handleComplete} />;
      case 'speaking':
        return <SpeakingPractice questions={currentModule.questions} onComplete={handleComplete} />;
      case 'listening':
        return <ListeningExercise questions={currentModule.questions} onComplete={handleComplete} />;
      default:
        return <FlashCard questions={currentModule.questions} onComplete={handleComplete} />;
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-20">
      <div className="mt-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-cute">
            {course.category}
          </span>
          <span className="text-xs bg-cream-100 text-cream-600 px-3 py-1 rounded-full font-cute">
            {course.level === 1 ? '初级' : course.level === 2 ? '中级' : '高级'}
          </span>
        </div>
        
        <h1 className="text-xl font-bold text-gray-800 font-cute mb-1">
          {course.title}
        </h1>
        <h2 className="text-lg text-pink-500 font-cute">
          {currentModule.title}
        </h2>
      </div>

      {renderModule()}
    </div>
  );
}

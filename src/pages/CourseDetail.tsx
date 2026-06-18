import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, ChevronRight, Star } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAppStore } from '../store/appStore';

const moduleTypeNames: Record<string, string> = {
  vocabulary: '词汇学习',
  grammar: '语法练习',
  speaking: '口语练习',
  listening: '听力训练',
};

const moduleTypeColors: Record<string, string> = {
  vocabulary: 'bg-pink-100 text-pink-500',
  grammar: 'bg-sky-100 text-sky-500',
  speaking: 'bg-beach-100 text-beach-500',
  listening: 'bg-green-100 text-green-500',
};

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourseById, progress } = useAppStore();

  const course = getCourseById(id || '');

  if (!course) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😢</div>
        <p className="text-gray-500 font-cute">课程不存在</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 pb-20">
      <div className="mt-6 mb-6">
        <img 
          src={course.imageUrl} 
          alt={course.title}
          className="w-full h-40 rounded-3xl object-cover mb-4"
        />
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-cute">
            {course.category}
          </span>
          <span className="text-xs bg-cream-100 text-cream-600 px-3 py-1 rounded-full font-cute">
            {course.level === 1 ? '初级' : course.level === 2 ? '中级' : '高级'}
          </span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 font-cute mb-2">
          {course.title}
        </h1>
        
        <p className="text-gray-600 font-cute">{course.description}</p>
      </div>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 font-cute">课程信息</h3>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-pink-500 font-cute">{course.modules.length}</p>
            <p className="text-xs text-gray-500 font-cute">学习模块</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-sky-500 font-cute">
              {course.modules.reduce((acc, m) => acc + m.questions.length, 0)}
            </p>
            <p className="text-xs text-gray-500 font-cute">题目数量</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-beach-500 font-cute">60</p>
            <p className="text-xs text-gray-500 font-cute">预计分钟</p>
          </div>
        </div>
      </Card>

      <div className="mb-4">
        <h3 className="font-bold text-gray-800 font-cute mb-3">学习模块</h3>
      </div>

      <div className="space-y-3">
        {course.modules.map((module, index) => {
          const moduleProgress = progress.find(p => p.moduleId === module.id);
          const isCompleted = moduleProgress && moduleProgress.completedQuestions === module.questions.length;

          return (
            <Card 
              key={module.id}
              onClick={() => navigate(`/learn/${course.id}/${module.id}`)}
              className="flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${moduleTypeColors[module.type]}`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800 font-cute">
                      {index + 1}. {module.title}
                    </span>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-cute">
                    {moduleTypeNames[module.type]} · {module.questions.length} 题
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

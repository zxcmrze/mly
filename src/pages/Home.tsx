import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Calendar, Clock, BookOpen, Award, TrendingUp } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAppStore } from '../store/appStore';
import { useUserStatsStore } from '../store/userStatsStore';

export default function Home() {
  const navigate = useNavigate();
  const { user, courses, progress } = useAppStore();
  
  // 从真实数据 store 读取统计信息和打卡状态
  const {
    consecutiveDays,
    totalDays,
    totalMinutes,
    totalWordsLearned,
    completedModules,
    lastCheckInDate,
    checkIn,
    loadFromStorage,
  } = useUserStatsStore();

  // 页面加载时从 localStorage 读取最新数据
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // 检查今天是否已打卡
  const todayString = new Date().toISOString().split('T')[0];
  const isCheckedInToday = lastCheckInDate === todayString;

  // 处理打卡按钮点击
  const handleCheckIn = () => {
    if (!isCheckedInToday) {
      checkIn(); // 调用真实的打卡逻辑
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-20">
      {/* 用户欢迎区域 */}
      <div className="mt-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 font-cute">
              你好, {user?.name}!
            </h2>
            <p className="text-gray-500 font-cute">
              今天也要努力学习呢！
            </p>
          </div>
        </div>
      </div>

      {/* 主要统计数据（从真实 store 读取） */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="text-center">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-5 h-5 text-pink-500" />
          </div>
          <p className="text-2xl font-bold text-pink-500 font-cute">{consecutiveDays}</p>
          <p className="text-xs text-gray-500 font-cute">连续签到</p>
        </Card>
        
        <Card className="text-center">
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-sky-500" />
          </div>
          <p className="text-2xl font-bold text-sky-500 font-cute">{totalMinutes}</p>
          <p className="text-xs text-gray-500 font-cute">学习分钟</p>
        </Card>
        
        <Card className="text-center">
          <div className="w-10 h-10 rounded-full bg-beach-100 flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-beach-500" />
          </div>
          <p className="text-2xl font-bold text-beach-500 font-cute">{totalWordsLearned}</p>
          <p className="text-xs text-gray-500 font-cute">学过的词</p>
        </Card>
      </div>

      {/* 每日打卡卡片（使用真实的打卡逻辑） */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 font-cute">每日打卡</h3>
          <Award className="w-6 h-6 text-yellow-500" />
        </div>
        
        {isCheckedInToday ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-2">🎉</div>
            <p className="mt-2 text-green-500 font-cute font-bold">
              已完成打卡！连续 {consecutiveDays} 天
            </p>
            <p className="text-sm text-gray-400 font-cute mt-1">
              继续保持，明天再来哦！
            </p>
          </div>
        ) : (
          <div>
            <Button onClick={handleCheckIn} className="w-full">
              立即打卡
            </Button>
            {consecutiveDays > 0 && (
              <p className="text-center text-sm text-gray-400 font-cute mt-2">
                已有 {consecutiveDays} 天连续记录，明天记得打卡哦！
              </p>
            )}
          </div>
        )}
      </Card>

      {/* 推荐课程 */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-800 font-cute">推荐课程</h3>
        <button 
          onClick={() => navigate('/courses')}
          className="text-pink-500 text-sm font-cute"
        >
          查看全部 →
        </button>
      </div>

      {/* 课程列表 */}
      {courses.slice(0, 2).map((course) => (
        <Card 
          key={course.id} 
          onClick={() => navigate(`/courses/${course.id}`)}
          className="mb-4 flex gap-4 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="w-20 h-20 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full font-cute">
                {course.category}
              </span>
              <span className="text-xs bg-cream-100 text-cream-600 px-2 py-0.5 rounded-full font-cute">
                {course.level === 1 ? '初级' : course.level === 2 ? '中级' : '高级'}
              </span>
            </div>
            <h4 className="font-bold text-gray-800 font-cute mb-1">{course.title}</h4>
            <p className="text-xs text-gray-500 font-cute line-clamp-2">{course.description}</p>
          </div>
        </Card>
      ))}

      {/* 学习进度（使用真实数据） */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <h3 className="font-bold text-gray-800 font-cute">学习进度</h3>
        </div>
        
        <div className="space-y-3">
          {courses.slice(0, 3).map((course) => {
            // 计算课程的完成进度
            const courseProgress = progress.find(p => p.courseId === course.id);
            const totalQuestions = course.modules.reduce((sum, m) => sum + m.questions.length, 0);
            const completedQuestions = courseProgress?.completedQuestions || 0;
            const progressPercent = totalQuestions > 0 
              ? Math.round((completedQuestions / totalQuestions) * 100)
              : 0;
            
            return (
              <div key={course.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 font-cute">{course.title}</span>
                  <span className="text-sm text-pink-500 font-cute">{progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 快速统计 */}
      <Card className="mb-6 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-pink-500 font-cute">{totalDays}</p>
            <p className="text-xs text-gray-500 font-cute">总学习天数</p>
          </div>
          <div>
            <p className="text-xl font-bold text-purple-500 font-cute">{completedModules}</p>
            <p className="text-xs text-gray-500 font-cute">完成模块</p>
          </div>
          <div>
            <p className="text-xl font-bold text-indigo-500 font-cute">
              {Math.floor(totalMinutes / 60)}
            </p>
            <p className="text-xs text-gray-500 font-cute">学习小时</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

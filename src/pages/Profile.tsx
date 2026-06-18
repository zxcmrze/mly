import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { User, Mail, Calendar, Clock, BookOpen, Award, Settings, ChevronRight, Target, Flame, Trash2 } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useUserStatsStore } from '../store/userStatsStore';

export default function Profile() {
  const navigate = useNavigate();
  const {
    totalDays,
    consecutiveDays,
    totalMinutes,
    completedCourses,
    completedModules,
    totalWordsLearned,
    accuracy,
    loadFromStorage,
  } = useUserStatsStore();

  // 从localStorage获取用户信息（游客模式）
  const userName = localStorage.getItem('user_name') || '马来语学习者';
  const userEmail = localStorage.getItem('user_email') || 'guest@learning.com';

  // 页面加载时从 localStorage 读取最新数据
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // 重置学习数据
  const handleResetData = () => {
    if (confirm('确定要重置所有学习数据吗？此操作不可恢复！')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // 根据真实数据动态生成成就列表
  const achievements = [
    {
      icon: '🌟',
      name: '初学者',
      desc: '完成第1课',
      unlocked: completedModules >= 1,
    },
    {
      icon: '🔥',
      name: '连续打卡',
      desc: `${consecutiveDays}天`,
      unlocked: consecutiveDays > 0,
      active: consecutiveDays >= 7,
    },
    {
      icon: '🎯',
      name: '准确率',
      desc: `${accuracy}%`,
      unlocked: accuracy > 0,
      active: accuracy >= 80,
    },
    {
      icon: '📚',
      name: '勤奋学生',
      desc: `${completedModules}模块`,
      unlocked: completedModules >= 1,
      active: completedModules >= 10,
    },
    {
      icon: '⏰',
      name: '学习时长',
      desc: `${Math.floor(totalMinutes / 60)}小时`,
      unlocked: totalMinutes > 0,
      active: totalMinutes >= 300,
    },
    {
      icon: '📖',
      name: '词汇量',
      desc: `${totalWordsLearned}词`,
      unlocked: totalWordsLearned > 0,
      active: totalWordsLearned >= 100,
    },
  ];

  return (
    <div className="max-w-md mx-auto px-4 pb-20">
      {/* 用户信息卡片 */}
      <div className="mt-6 mb-6">
        <Card className="flex flex-col items-center py-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 flex items-center justify-center mb-4 shadow-lg">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 font-cute mb-1">
            {userName}
          </h2>
          <div className="flex items-center gap-2 text-gray-500 font-cute">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{userEmail}</span>
          </div>
          {/* 今日打卡状态 */}
          <div className="mt-3 flex items-center gap-2">
            {consecutiveDays > 0 ? (
              <>
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-orange-500 font-cute font-bold">
                  已连续学习 {consecutiveDays} 天
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-400 font-cute">
                点击首页打卡开始学习
              </span>
            )}
          </div>
        </Card>
      </div>

      {/* 主要统计数据 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="text-center">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-5 h-5 text-pink-500" />
          </div>
          <p className="text-2xl font-bold text-pink-500 font-cute">{totalDays}</p>
          <p className="text-xs text-gray-500 font-cute">总学习天数</p>
        </Card>
        
        <Card className="text-center">
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-sky-500" />
          </div>
          <p className="text-2xl font-bold text-sky-500 font-cute">
            {totalMinutes}
          </p>
          <p className="text-xs text-gray-500 font-cute">学习分钟</p>
        </Card>
        
        <Card className="text-center">
          <div className="w-10 h-10 rounded-full bg-beach-100 flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-beach-500" />
          </div>
          <p className="text-2xl font-bold text-beach-500 font-cute">
            {completedCourses}
          </p>
          <p className="text-xs text-gray-500 font-cute">已完成课程</p>
        </Card>
        
        <Card className="text-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500 font-cute">{accuracy}%</p>
          <p className="text-xs text-gray-500 font-cute">正确率</p>
        </Card>
      </div>

      {/* 额外统计数据 */}
      <Card className="mb-6">
        <h3 className="font-bold text-gray-800 font-cute mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-500" />
          学习详情
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-purple-500 font-cute">
              {completedModules}
            </p>
            <p className="text-xs text-gray-500 font-cute">完成模块</p>
          </div>
          <div>
            <p className="text-lg font-bold text-indigo-500 font-cute">
              {totalWordsLearned}
            </p>
            <p className="text-xs text-gray-500 font-cute">学单词</p>
          </div>
          <div>
            <p className="text-lg font-bold text-teal-500 font-cute">
              {Math.floor(totalMinutes / 60)}
            </p>
            <p className="text-xs text-gray-500 font-cute">学习小时</p>
          </div>
        </div>
      </Card>

      {/* 学习成就 */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 font-cute mb-3">🏆 学习成就</h3>
        
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className={`text-center p-3 transition-all ${
                achievement.unlocked 
                  ? 'opacity-100' 
                  : 'opacity-50 grayscale'
              } ${achievement.active ? 'ring-2 ring-pink-300' : ''}`}
            >
              <span className="text-3xl mb-2 block">
                {achievement.unlocked ? achievement.icon : '🔒'}
              </span>
              <p className={`text-xs font-bold font-cute ${
                achievement.active ? 'text-pink-500' : 'text-gray-700'
              }`}>
                {achievement.name}
              </p>
              <p className="text-xs text-gray-400 font-cute">{achievement.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 菜单选项 */}
      <div className="space-y-2">
        <Card 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-pink-50 transition-colors"
          onClick={() => navigate('/settings')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <Settings className="w-5 h-5 text-pink-500" />
            </div>
            <span className="font-cute text-gray-700">设置</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Card>
        
        <Card 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-pink-50 transition-colors"
          onClick={() => alert('联系我们: support@beachcat-learning.com')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-sky-500" />
            </div>
            <span className="font-cute text-gray-700">联系我们</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Card>
        
        <Card 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-pink-50 transition-colors"
          onClick={() => navigate('/about')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-beach-100 flex items-center justify-center">
              <Award className="w-5 h-5 text-beach-500" />
            </div>
            <span className="font-cute text-gray-700">关于我们</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Card>
      </div>

      {/* 重置学习数据按钮 */}
      <Button 
        variant="outline" 
        className="w-full mt-6 border-red-200 text-red-500 hover:bg-red-50"
        onClick={handleResetData}
      >
        <Trash2 className="w-5 h-5" />
        重置学习数据
      </Button>

      {/* 底部版权 */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm font-cute">
          🌸 海滩小喵猫学习助手 🌸
        </p>
        <p className="text-gray-300 text-xs font-cute mt-1">
          v1.0.0
        </p>
      </div>
    </div>
  );
}

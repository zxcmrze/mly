import { useEffect } from 'react';
import { Award, Star, Clock, BookOpen, Target, Trophy, Flame, CheckCircle, TrendingUp } from 'lucide-react';
import Card from '../components/common/Card';
import { useUserStatsStore } from '../store/userStatsStore';

export default function Achievements() {
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

  // 页面加载时从 localStorage 读取最新数据
  useEffect(() => {
    loadFromStorage();
    console.log('成就页面加载，统计数据：', {
      totalDays,
      consecutiveDays,
      totalMinutes,
      completedCourses,
      completedModules,
      totalWordsLearned,
      accuracy,
    });
  }, [loadFromStorage, totalDays, consecutiveDays, totalMinutes, completedCourses, completedModules, totalWordsLearned, accuracy]);

  // 完整成就列表（所有成就应该默认显示，只是状态不同）
  const allAchievements = [
    // 学习类成就
    { icon: '📚', name: '初学者', desc: '完成第1个模块', condition: completedModules >= 1, unlocked: completedModules >= 1, category: '学习' },
    { icon: '📖', name: '勤奋学生', desc: '完成10个模块', condition: completedModules >= 10, unlocked: completedModules >= 10, category: '学习' },
    { icon: '🎓', name: '学霸', desc: '完成30个模块', condition: completedModules >= 30, unlocked: completedModules >= 30, category: '学习' },
    
    // 连续学习成就
    { icon: '🔥', name: '初起步', desc: '连续学习1天', condition: consecutiveDays >= 1, unlocked: consecutiveDays >= 1, category: '连续' },
    { icon: '🔥', name: '3日坚持', desc: '连续学习3天', condition: consecutiveDays >= 3, unlocked: consecutiveDays >= 3, category: '连续' },
    { icon: '🔥', name: '一周达人', desc: '连续学习7天', condition: consecutiveDays >= 7, unlocked: consecutiveDays >= 7, category: '连续' },
    { icon: '🔥', name: '两周坚持', desc: '连续学习14天', condition: consecutiveDays >= 14, unlocked: consecutiveDays >= 14, category: '连续' },
    { icon: '🔥', name: '月度学习', desc: '连续学习30天', condition: consecutiveDays >= 30, unlocked: consecutiveDays >= 30, category: '连续' },
    
    // 课程完成成就
    { icon: '🏆', name: '首课完成', desc: '完成第1个课程', condition: completedCourses >= 1, unlocked: completedCourses >= 1, category: '课程' },
    { icon: '🎯', name: '课程达人', desc: '完成3个课程', condition: completedCourses >= 3, unlocked: completedCourses >= 3, category: '课程' },
    { icon: '⭐', name: '课程专家', desc: '完成所有课程', condition: completedCourses >= 4, unlocked: completedCourses >= 4, category: '课程' },
    
    // 时间学习成就
    { icon: '⏰', name: '初学者', desc: '学习1小时', condition: totalMinutes >= 60, unlocked: totalMinutes >= 60, category: '时间' },
    { icon: '⏰', name: '学习5小时', desc: '学习5小时', condition: totalMinutes >= 300, unlocked: totalMinutes >= 300, category: '时间' },
    { icon: '⏰', name: '学习10小时', desc: '学习10小时', condition: totalMinutes >= 600, unlocked: totalMinutes >= 600, category: '时间' },
    { icon: '⏰', name: '学习50小时', desc: '学习50小时', condition: totalMinutes >= 3000, unlocked: totalMinutes >= 3000, category: '时间' },
    
    // 词汇量成就
    { icon: '💬', name: '词汇新手', desc: '学习50个词', condition: totalWordsLearned >= 50, unlocked: totalWordsLearned >= 50, category: '词汇' },
    { icon: '💬', name: '词汇达人', desc: '学习100个词', condition: totalWordsLearned >= 100, unlocked: totalWordsLearned >= 100, category: '词汇' },
    { icon: '💬', name: '词汇专家', desc: '学习200个词', condition: totalWordsLearned >= 200, unlocked: totalWordsLearned >= 200, category: '词汇' },
    { icon: '💬', name: '词汇大师', desc: '学习500个词', condition: totalWordsLearned >= 500, unlocked: totalWordsLearned >= 500, category: '词汇' },
    
    // 准确率成就
    { icon: '🎯', name: '初试身手', desc: '准确率50%', condition: accuracy >= 50, unlocked: accuracy >= 50, category: '准确' },
    { icon: '🎯', name: '良好表现', desc: '准确率70%', condition: accuracy >= 70, unlocked: accuracy >= 70, category: '准确' },
    { icon: '🎯', name: '优秀学员', desc: '准确率85%', condition: accuracy >= 85, unlocked: accuracy >= 85, category: '准确' },
    { icon: '🎯', name: '完美主义', desc: '准确率95%', condition: accuracy >= 95, unlocked: accuracy >= 95, category: '准确' },
    
    // 天数成就
    { icon: '📅', name: '第一日', desc: '学习1天', condition: totalDays >= 1, unlocked: totalDays >= 1, category: '天数' },
    { icon: '📅', name: '学习一周', desc: '学习7天', condition: totalDays >= 7, unlocked: totalDays >= 7, category: '天数' },
    { icon: '📅', name: '学习一月', desc: '学习30天', condition: totalDays >= 30, unlocked: totalDays >= 30, category: '天数' },
  ];

  // 计算已解锁成就数量
  const unlockedCount = allAchievements.filter(a => a.unlocked).length;
  const totalCount = allAchievements.length;

  // 按分类分组
  const categories = ['学习', '连续', '课程', '时间', '词汇', '准确', '天数'];
  const groupedAchievements = categories.map(cat => ({
    category: cat,
    items: allAchievements.filter(a => a.category === cat),
  }));

  return (
    <div className="max-w-md mx-auto px-4 pb-20">
      {/* 页面标题 */}
      <div className="mt-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 font-cute mb-2 flex items-center gap-2">
          <Trophy className="w-7 h-7 text-yellow-500" />
          学习成就
        </h1>
        <p className="text-gray-500 font-cute">完成各种挑战，解锁更多成就！</p>
      </div>

      {/* 总体进度卡片 */}
      <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            <span className="font-bold text-gray-800 font-cute">成就进度</span>
          </div>
          <span className="text-2xl font-bold text-yellow-500 font-cute">
            {unlockedCount}/{totalCount}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 font-cute mt-2">
          已解锁 {unlockedCount} 个成就，还需要 {totalCount - unlockedCount} 个
        </p>
      </Card>

      {/* 快速统计 */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <Card className="text-center py-3">
          <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-gray-800 font-cute">{consecutiveDays}</p>
          <p className="text-xs text-gray-500 font-cute">连续天</p>
        </Card>
        <Card className="text-center py-3">
          <BookOpen className="w-5 h-5 text-pink-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-gray-800 font-cute">{completedModules}</p>
          <p className="text-xs text-gray-500 font-cute">完成模块</p>
        </Card>
        <Card className="text-center py-3">
          <Clock className="w-5 h-5 text-sky-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-gray-800 font-cute">{Math.floor(totalMinutes / 60)}</p>
          <p className="text-xs text-gray-500 font-cute">学习小时</p>
        </Card>
        <Card className="text-center py-3">
          <Target className="w-5 h-5 text-green-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-gray-800 font-cute">{accuracy}%</p>
          <p className="text-xs text-gray-500 font-cute">准确率</p>
        </Card>
      </div>

      {/* 按分类显示成就 */}
      {groupedAchievements.map((group) => (
        <div key={group.category} className="mb-6">
          <h3 className="font-bold text-gray-800 font-cute mb-3 flex items-center gap-2">
            {group.category === '学习' && <BookOpen className="w-5 h-5 text-pink-500" />}
            {group.category === '连续' && <Flame className="w-5 h-5 text-orange-500" />}
            {group.category === '课程' && <Trophy className="w-5 h-5 text-yellow-500" />}
            {group.category === '时间' && <Clock className="w-5 h-5 text-sky-500" />}
            {group.category === '词汇' && <Star className="w-5 h-5 text-purple-500" />}
            {group.category === '准确' && <Target className="w-5 h-5 text-green-500" />}
            {group.category === '天数' && <TrendingUp className="w-5 h-5 text-indigo-500" />}
            {group.category}
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            {group.items.map((achievement, index) => (
              <Card 
                key={`${achievement.name}-${index}`}
                className={`text-center p-3 transition-all ${
                  achievement.unlocked 
                    ? 'opacity-100 bg-gradient-to-b from-yellow-50 to-white border border-yellow-200' 
                    : 'opacity-60 bg-gray-50'
                } ${achievement.unlocked && !achievement.condition ? 'ring-2 ring-pink-300' : ''}`}
              >
                <span className="text-3xl mb-2 block">
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </span>
                <p className={`text-xs font-bold font-cute ${
                  achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {achievement.name}
                </p>
                <p className="text-xs text-gray-400 font-cute">{achievement.desc}</p>
                {achievement.unlocked && (
                  <div className="mt-1">
                    <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* 底部提示 */}
      <Card className="mt-6 bg-blue-50 border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className="text-sm text-blue-800 font-cute font-bold mb-1">成就提示</p>
            <p className="text-xs text-blue-600 font-cute">
              继续学习，解锁更多成就！每完成一个模块、完成每日打卡、提高准确率都能获得新的成就。
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

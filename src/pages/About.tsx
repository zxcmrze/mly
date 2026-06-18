import { useNavigate } from 'react-router-dom';
import { Heart, Star, BookOpen, Users, Mail, Globe } from 'lucide-react';
import Card from '../components/common/Card';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto px-4 pb-20">
      {/* 页面标题 */}
      <div className="mt-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 font-cute">关于我们</h1>
        <p className="text-gray-500 font-cute mt-1">了解这款可爱的学习应用</p>
      </div>

      {/* App Logo和名称 */}
      <Card className="mb-6 text-center py-10 bg-gradient-to-r from-pink-50 via-purple-50 to-sky-50">
        <div className="text-8xl mb-4 animate-float">🐱🌸</div>
        <h2 className="text-3xl font-bold text-pink-500 font-cute mb-2">
          海滩小喵猫
        </h2>
        <p className="text-xl text-purple-500 font-cute mb-4">
          马来语学习助手
        </p>
        <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
          <span className="text-sm text-gray-500 font-cute">版本</span>
          <span className="text-sm font-bold text-pink-500 font-cute">v1.0.0</span>
        </div>
      </Card>

      {/* 品牌介绍 */}
      <Card className="mb-6">
        <h3 className="font-bold text-gray-800 font-cute mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          关于我们
        </h3>
        <div className="space-y-4 text-gray-600 font-cute">
          <p>
            🌸 <strong className="text-pink-500">海滩小喵猫</strong> 是一款专为马来西亚华人留学生打造的马来语学习应用。
          </p>
          <p>
            🎯 我们的使命是帮助护理专业和中医专业的学生，轻松掌握临床护理和日常交流所需的马来语词汇。
          </p>
          <p>
            💖 致力于提供最优质的马来语学习体验，让学习变得有趣又高效！
          </p>
        </div>
      </Card>

      {/* 核心功能 */}
      <Card className="mb-6">
        <h3 className="font-bold text-gray-800 font-cute mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-pink-500" />
          核心功能
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span>📚</span>
            </div>
            <div>
              <p className="font-cute text-gray-800 font-bold">专业课程</p>
              <p className="text-xs text-gray-500 font-cute">涵盖护理、中医、日常生活、社交等实用场景</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span>🎮</span>
            </div>
            <div>
              <p className="font-cute text-gray-800 font-bold">互动学习</p>
              <p className="text-xs text-gray-500 font-cute">单词卡片、语法练习、口语跟读、听力训练</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span>🏆</span>
            </div>
            <div>
              <p className="font-cute text-gray-800 font-bold">成就系统</p>
              <p className="text-xs text-gray-500 font-cute">解锁各种学习成就，保持学习动力</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span>📊</span>
            </div>
            <div>
              <p className="font-cute text-gray-800 font-bold">进度追踪</p>
              <p className="text-xs text-gray-500 font-cute">记录学习数据，查看学习统计</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 目标用户 */}
      <Card className="mb-6">
        <h3 className="font-bold text-gray-800 font-cute mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-sky-500" />
          目标用户
        </h3>
        <div className="space-y-3">
          <div className="bg-pink-50 rounded-xl p-3">
            <p className="font-cute text-pink-600 font-bold mb-1">👩‍⚕️ 护理专业学生</p>
            <p className="text-xs text-gray-600 font-cute">
              掌握临床护理用语、医疗器械、医患沟通等
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3">
            <p className="font-cute text-purple-600 font-bold mb-1">🏥 中医专业学生</p>
            <p className="text-xs text-gray-600 font-cute">
              学习针灸穴位、拔罐刮痧、中草药等专业术语
            </p>
          </div>
          <div className="bg-sky-50 rounded-xl p-3">
            <p className="font-cute text-sky-600 font-bold mb-1">🌏 马来西亚华人</p>
            <p className="text-xs text-gray-600 font-cute">
              日常生活会话、交通出行、社交礼仪等实用场景
            </p>
          </div>
        </div>
      </Card>

      {/* 联系方式 */}
      <Card className="mb-6">
        <h3 className="font-bold text-gray-800 font-cute mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-pink-500" />
          联系我们
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-cute text-gray-800">邮箱</p>
              <p className="text-xs text-gray-500 font-cute">support@beachcat-learning.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Globe className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="font-cute text-gray-800">网站</p>
              <a 
                href="https://www.beachcat-learning.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-green-500 font-cute hover:underline"
              >
                www.beachcat-learning.com
              </a>
            </div>
          </div>
        </div>
      </Card>

      {/* 底部信息 */}
      <Card className="text-center py-6 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl">🐱</span>
          <span className="text-2xl">🌸</span>
          <span className="text-2xl">💖</span>
        </div>
        <p className="text-sm text-gray-600 font-cute mb-2">
          用心打造，伴你成长
        </p>
        <p className="text-xs text-gray-400 font-cute">
          © 2024 海滩小喵猫学习助手
        </p>
        <p className="text-xs text-gray-400 font-cute mt-1">
          Made with <Heart className="w-3 h-3 inline text-red-400" /> for Malaysian Chinese students
        </p>
      </Card>

      {/* 返回按钮 */}
      <button
        onClick={() => navigate(-1)}
        className="w-full mt-6 py-3 text-pink-500 font-cute hover:bg-pink-50 rounded-xl transition-colors"
      >
        ← 返回上一页
      </button>
    </div>
  );
}

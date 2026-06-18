import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Trash2, Type, Moon, Sun, Bell, ChevronRight, Check } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function Settings() {
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(true);

  // 从localStorage读取设置
  useEffect(() => {
    const savedFontSize = localStorage.getItem('user_font_size') as 'small' | 'medium' | 'large' | null;
    const savedDarkMode = localStorage.getItem('user_dark_mode') === 'true';
    const savedNotification = localStorage.getItem('user_notification') !== 'false';
    
    if (savedFontSize) setFontSize(savedFontSize);
    setDarkMode(savedDarkMode);
    setNotification(savedNotification);
  }, []);

  // 清除缓存
  const handleClearCache = () => {
    setShowClearConfirm(true);
  };

  const confirmClearCache = () => {
    // 清除学习数据相关的localStorage
    const keysToRemove = [
      'user_learning_stats',
      'user_progress',
      'user_checkin_history',
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    setShowClearConfirm(false);
    alert('学习数据已清除！页面将刷新...');
    window.location.reload();
  };

  // 保存字体大小设置
  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    localStorage.setItem('user_font_size', size);
    
    // 应用字体大小到body
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    document.body.style.fontSize = fontSizes[size];
  };

  // 切换夜间模式
  const handleDarkModeToggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('user_dark_mode', String(newValue));
    
    // 应用夜间模式样式
    if (newValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // 切换通知
  const handleNotificationToggle = () => {
    const newValue = !notification;
    setNotification(newValue);
    localStorage.setItem('user_notification', String(newValue));
  };

  // 重置所有学习数据
  const handleResetData = () => {
    if (confirm('确定要重置所有学习数据吗？此操作不可恢复！')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-20">
      {/* 页面标题 */}
      <div className="mt-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 font-cute flex items-center gap-2">
          <SettingsIcon className="w-7 h-7 text-pink-500" />
          设置
        </h1>
        <p className="text-gray-500 font-cute mt-1">自定义你的学习体验</p>
      </div>

      {/* 清除缓存 */}
      <Card className="mb-4">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="font-cute text-gray-800 font-bold">清除学习数据</p>
              <p className="text-xs text-gray-500 font-cute">重置所有学习进度和统计</p>
            </div>
          </div>
          <button
            onClick={handleClearCache}
            className="px-4 py-2 bg-red-100 text-red-500 rounded-full text-sm font-cute hover:bg-red-200 transition-colors"
          >
            清除
          </button>
        </div>
      </Card>

      {/* 字体大小 */}
      <Card className="mb-4">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <Type className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <p className="font-cute text-gray-800 font-bold">字体大小</p>
              <p className="text-xs text-gray-500 font-cute">调整应用内文字大小</p>
            </div>
          </div>
          
          <div className="flex gap-2 ml-13">
            <button
              onClick={() => handleFontSizeChange('small')}
              className={`flex-1 py-3 rounded-xl font-cute transition-all ${
                fontSize === 'small'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-50'
              }`}
            >
              小
            </button>
            <button
              onClick={() => handleFontSizeChange('medium')}
              className={`flex-1 py-3 rounded-xl font-cute transition-all ${
                fontSize === 'medium'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-50'
              }`}
            >
              中
            </button>
            <button
              onClick={() => handleFontSizeChange('large')}
              className={`flex-1 py-3 rounded-xl font-cute transition-all ${
                fontSize === 'large'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-50'
              }`}
            >
              大
            </button>
          </div>
        </div>
      </Card>

      {/* 夜间模式 */}
      <Card className="mb-4">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              {darkMode ? (
                <Moon className="w-5 h-5 text-indigo-500" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
            </div>
            <div>
              <p className="font-cute text-gray-800 font-bold">夜间模式</p>
              <p className="text-xs text-gray-500 font-cute">切换深色主题</p>
            </div>
          </div>
          <button
            onClick={handleDarkModeToggle}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              darkMode ? 'bg-indigo-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                darkMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </Card>

      {/* 通知设置 */}
      <Card className="mb-4">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="font-cute text-gray-800 font-bold">学习提醒</p>
              <p className="text-xs text-gray-500 font-cute">每日打卡提醒通知</p>
            </div>
          </div>
          <button
            onClick={handleNotificationToggle}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              notification ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                notification ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </Card>

      {/* 其他设置 */}
      <Card className="mb-4">
        <div className="divide-y divide-gray-100">
          <button
            onClick={() => alert('功能开发中...')}
            className="w-full flex items-center justify-between p-4 hover:bg-pink-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                <span className="text-lg">🌐</span>
              </div>
              <span className="font-cute text-gray-800">切换语言</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm font-cute">中文</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
          
          <button
            onClick={() => alert('功能开发中...')}
            className="w-full flex items-center justify-between p-4 hover:bg-pink-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-lg">🔊</span>
              </div>
              <span className="font-cute text-gray-800">发音设置</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          
          <button
            onClick={() => navigate('/about')}
            className="w-full flex items-center justify-between p-4 hover:bg-pink-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-lg">ℹ️</span>
              </div>
              <span className="font-cute text-gray-800">关于我们</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </Card>

      {/* 危险操作 */}
      <Card className="mb-4 border-2 border-red-200 bg-red-50">
        <button
          onClick={handleResetData}
          className="w-full flex items-center justify-between p-4 hover:bg-red-100 transition-colors rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-left">
              <p className="font-cute text-red-600 font-bold">重置学习数据</p>
              <p className="text-xs text-red-400 font-cute">清空所有学习记录</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-red-400" />
        </button>
      </Card>

      {/* 清除确认弹窗 */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <Card className="w-full max-w-sm p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 font-cute mb-2">确认清除</h3>
              <p className="text-gray-500 font-cute text-sm">
                确定要清除所有学习数据吗？这将重置你的学习进度、成就和统计数据。
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowClearConfirm(false)}
              >
                取消
              </Button>
              <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={confirmClearCache}>
                确认清除
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* 版本信息 */}
      <div className="text-center mt-6 pb-4">
        <p className="text-xs text-gray-400 font-cute">海滩小喵猫学习助手 v1.0.0</p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../components/common/Button';
import { useAppStore } from '../store/appStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('请填写所有信息！');
      return;
    }
    
    login(email, password);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-float">🐱🌸</div>
        <h1 className="text-3xl font-bold text-pink-500 font-cute mb-2">
          马来语学习助手
        </h1>
        <p className="text-gray-500 font-cute">
          和可爱小喵一起学习吧！
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white/80 rounded-2xl p-4 box-shadow-card">
          <label className="block text-sm font-cute text-gray-600 mb-2">邮箱</label>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-pink-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
              className="flex-1 border-none outline-none bg-transparent font-cute"
            />
          </div>
        </div>

        <div className="bg-white/80 rounded-2xl p-4 box-shadow-card">
          <label className="block text-sm font-cute text-gray-600 mb-2">密码</label>
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-pink-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="flex-1 border-none outline-none bg-transparent font-cute"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-center font-cute">{error}</p>
        )}

        <Button type="submit" className="w-full">
          登录
        </Button>
      </form>

      <p className="text-center mt-6 font-cute">
        还没有账号？{' '}
        <button 
          onClick={() => navigate('/register')}
          className="text-pink-500 font-bold"
        >
          立即注册
        </button>
      </p>

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm font-cute">
          🌸 海滩小喵猫学习助手 🌸
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import Button from '../components/common/Button';
import { useAppStore } from '../store/appStore';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const register = useAppStore((state) => state.register);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    if (password.length < 6) {
      setError('密码长度不能少于6位');
      return;
    }
    
    register(email, password, name);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-float">🐱🌸</div>
        <h1 className="text-3xl font-bold text-pink-500 font-cute mb-2">
          注册新账号
        </h1>
        <p className="text-gray-500 font-cute">
          开始你的学习之旅吧！
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white/80 rounded-2xl p-4 box-shadow-card">
          <label className="block text-sm font-cute text-gray-600 mb-2">昵称</label>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-pink-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入昵称"
              className="flex-1 border-none outline-none bg-transparent font-cute"
            />
          </div>
        </div>

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

        <div className="bg-white/80 rounded-2xl p-4 box-shadow-card">
          <label className="block text-sm font-cute text-gray-600 mb-2">确认密码</label>
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-pink-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="请再次输入密码"
              className="flex-1 border-none outline-none bg-transparent font-cute"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-center font-cute">{error}</p>
        )}

        <Button type="submit" className="w-full">
          注册
        </Button>
      </form>

      <p className="text-center mt-6 font-cute">
        已有账号？{' '}
        <button 
          onClick={() => navigate('/login')}
          className="text-pink-500 font-bold"
        >
          立即登录
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

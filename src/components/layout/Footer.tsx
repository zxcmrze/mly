import { Home, BookOpen, User, Award } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, path: '/', label: '首页' },
    { icon: BookOpen, path: '/courses', label: '课程' },
    { icon: Award, path: '/achievements', label: '成就' },
    { icon: User, path: '/profile', label: '我的' },
  ];

  return (
    <footer className="bg-white/60 backdrop-blur-md fixed bottom-0 w-full px-4 py-2">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                isActive ? 'bg-pink-50' : 'hover:bg-pink-50'
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'text-pink-500' : 'text-pink-400'}`} />
              <span className={`text-xs font-cute ${isActive ? 'text-pink-500' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </footer>
  );
}

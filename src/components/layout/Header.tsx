import { Home, BookOpen, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export default function Header({ title, showBack = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, path: '/', label: '首页' },
    { icon: BookOpen, path: '/courses', label: '课程' },
    { icon: User, path: '/profile', label: '我的' },
  ];

  return (
    <header className="bg-white/60 backdrop-blur-md sticky top-0 z-50 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-pink-100 transition-colors"
            >
              <X className="w-6 h-6 text-pink-500" />
            </button>
          )}
          <h1 className="text-xl font-bold text-pink-500 font-cute">{title}</h1>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-pink-100 transition-colors"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-pink-500" />
          ) : (
            <Menu className="w-6 h-6 text-pink-500" />
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="mt-4 pb-4 border-t border-pink-100 pt-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50 transition-colors"
              >
                <item.icon className="w-5 h-5 text-pink-500" />
                <span className="font-cute text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

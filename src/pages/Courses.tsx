import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import Card from '../components/common/Card';
import { useAppStore } from '../store/appStore';
import { categories, levels } from '../data/mockData';

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  const navigate = useNavigate();
  const { courses, progress } = useAppStore();

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || 
                        (selectedLevel === 'Beginner' && course.level === 1) ||
                        (selectedLevel === 'Intermediate' && course.level === 2) ||
                        (selectedLevel === 'Advanced' && course.level === 3);
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="max-w-md mx-auto px-4 pb-20">
      <div className="mt-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-cute mb-4">课程列表</h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索课程..."
            className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl font-cute outline-none box-shadow-card"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-pink-500 font-cute mb-4"
        >
          <Filter className="w-5 h-5" />
          筛选
        </button>

        {showFilters && (
          <div className="bg-white/80 rounded-2xl p-4 mb-6 box-shadow-card">
            <div className="mb-4">
              <p className="text-sm text-gray-600 font-cute mb-2">分类</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-cute transition-all ${
                      selectedCategory === category
                        ? 'bg-pink-500 text-white'
                        : 'bg-pink-100 text-pink-500'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 font-cute mb-2">难度</p>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-3 py-1 rounded-full text-sm font-cute transition-all ${
                      selectedLevel === level
                        ? 'bg-sky-500 text-white'
                        : 'bg-sky-100 text-sky-500'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {filteredCourses.map((course) => {
          const courseProgress = progress.find(p => p.courseId === course.id);
          const progressPercent = courseProgress 
            ? Math.round((courseProgress.completedQuestions / courseProgress.totalQuestions) * 100)
            : 0;

          return (
            <Card 
              key={course.id} 
              onClick={() => navigate(`/courses/${course.id}`)}
              className="flex gap-4"
            >
              <img 
                src={course.imageUrl} 
                alt={course.title}
                className="w-24 h-24 rounded-2xl object-cover"
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
                <p className="text-xs text-gray-500 font-cute line-clamp-2 mb-2">{course.description}</p>
                
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-pink-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 font-cute mt-1">
                  进度: {progressPercent}%
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-gray-500 font-cute">没有找到匹配的课程</p>
        </div>
      )}
    </div>
  );
}

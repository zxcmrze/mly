import { useState, useEffect } from 'react';

interface CatAnimationProps {
  type: 'happy' | 'cry' | 'idle';
  show: boolean;
}

export default function CatAnimation({ type, show }: CatAnimationProps) {
  const [stars, setStars] = useState<number[]>([]);
  const [drops, setDrops] = useState<number[]>([]);

  useEffect(() => {
    if (type === 'happy' && show) {
      setStars([1, 2, 3, 4, 5]);
      setTimeout(() => setStars([]), 1000);
    } else if (type === 'cry' && show) {
      setDrops([1, 2, 3]);
      setTimeout(() => setDrops([]), 1000);
    }
  }, [type, show]);

  if (!show) return null;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 开心时的星星特效 */}
      {type === 'happy' && stars.map((star) => (
        <div
          key={star}
          className="absolute text-yellow-400 text-2xl animate-star"
          style={{
            left: `${20 + star * 15}px`,
            top: `${-20 - star * 10}px`,
            animationDelay: `${star * 0.1}s`,
          }}
        >
          ⭐
        </div>
      ))}
      
      {/* 哭泣时的水滴特效 */}
      {type === 'cry' && drops.map((drop) => (
        <div
          key={drop}
          className="absolute text-blue-400 text-lg animate-drop"
          style={{
            left: `${30 + drop * 20}px`,
            top: `${10}px`,
            animationDelay: `${drop * 0.2}s`,
          }}
        >
          💧
        </div>
      ))}

      {/* 小猫表情 */}
      <div className={`text-8xl ${type === 'happy' ? 'animate-happy' : type === 'cry' ? 'animate-cry' : 'animate-float'}`}>
        {type === 'happy' && '😸'}
        {type === 'cry' && '😿'}
        {type === 'idle' && '🐱'}
      </div>

      {/* 提示文字 */}
      <div className="mt-4 text-xl font-bold font-cute">
        {type === 'happy' && <span className="text-pink-500">太棒了！🎉</span>}
        {type === 'cry' && <span className="text-blue-400">加油，再试一次！💪</span>}
        {type === 'idle' && <span className="text-cream-600">准备开始！🌸</span>}
      </div>
    </div>
  );
}

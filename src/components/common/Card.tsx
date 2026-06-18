import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white/80 backdrop-blur-sm rounded-3xl p-6 box-shadow-card transition-all duration-300',
        onClick && 'cursor-pointer hover:scale-105 hover:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}

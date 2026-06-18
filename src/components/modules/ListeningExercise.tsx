import { useState } from 'react';
import { Play, Pause, Check, X } from 'lucide-react';
import { Question } from '../../types';
import CatAnimation from '../common/CatAnimation';
import Button from '../common/Button';

interface ListeningExerciseProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export default function ListeningExercise({ questions, onComplete }: ListeningExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [catType, setCatType] = useState<'happy' | 'cry' | 'idle'>('idle');
  const [showCat, setShowCat] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handlePlay = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      utterance.lang = 'ms-MY';
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    setCatType(isCorrect ? 'happy' : 'cry');
    setShowCat(true);
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    setTimeout(() => {
      setShowCat(false);
      setShowResult(true);
    }, 1000);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsPlaying(false);
    } else {
      onComplete(correctCount);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-pink-500 font-cute">题目 {currentIndex + 1}/{questions.length}</span>
        <span className="text-green-500 font-cute">正确: {correctCount}</span>
      </div>

      {showCat ? (
        <div className="h-64 flex items-center justify-center">
          <CatAnimation type={catType} show={showCat} />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl p-6 mb-6 box-shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs bg-green-100 text-green-500 px-3 py-1 rounded-full font-cute">
                听力训练
              </span>
            </div>
            
            <div className="flex flex-col items-center">
              <button
                onClick={handlePlay}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  isPlaying 
                    ? 'bg-green-400 animate-pulse' 
                    : 'bg-gradient-to-r from-sky-400 to-sky-500 hover:scale-110'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-white" />
                ) : (
                  <Play className="w-10 h-10 text-white ml-1" />
                )}
              </button>
              
              <p className="mt-4 text-gray-500 font-cute">
                {isPlaying ? '播放中...' : '点击播放按钮听录音'}
              </p>
            </div>
          </div>

          <div className="bg-white/60 rounded-3xl p-6 mb-6">
            <p className="text-center text-gray-600 mb-4 font-cute">
              请选择你听到的句子的中文意思:
            </p>
            
            {!showResult ? (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(option)}
                    className={`w-full p-4 rounded-xl font-cute transition-all flex items-center gap-3 ${
                      selectedAnswer === option
                        ? 'bg-pink-100 border-2 border-pink-400'
                        : 'bg-white hover:bg-pink-50 border-2 border-transparent'
                    }`}
                  >
                    <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-left">{option}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className={`p-4 rounded-xl text-center font-cute ${
                selectedAnswer === currentQuestion.correctAnswer 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    回答正确！
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <X className="w-5 h-5" />
                    正确答案: {currentQuestion.correctAnswer}
                  </span>
                )}
              </div>
            )}
          </div>

          {showResult && (
            <Button onClick={handleNext} className="w-full">
              {currentIndex < questions.length - 1 ? '下一题' : '完成'}
            </Button>
          )}
        </>
      )}
    </div>
  );
}

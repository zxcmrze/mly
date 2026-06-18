import { useState } from 'react';
import { RotateCcw, Volume2, Check } from 'lucide-react';
import { Question } from '../../types';
import CatAnimation from '../common/CatAnimation';
import Button from '../common/Button';

interface FlashCardProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export default function FlashCard({ questions, onComplete }: FlashCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [catType, setCatType] = useState<'happy' | 'cry' | 'idle'>('idle');
  const [showCat, setShowCat] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentIndex];

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
      setFlipped(false);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete(correctCount);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
    utterance.lang = 'ms-MY';
    speechSynthesis.speak(utterance);
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
          <div 
            onClick={handleFlip}
            className="bg-white rounded-3xl p-8 mb-6 box-shadow-card cursor-pointer transition-transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-cute">
                词汇学习
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); handleSpeak(); }}
                className="p-2 rounded-full hover:bg-pink-100 transition-colors"
              >
                <Volume2 className="w-5 h-5 text-pink-400" />
              </button>
            </div>
            
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 font-cute">
              {currentQuestion.question}
            </h2>
            
            <p className="text-center text-gray-400 text-sm">点击卡片查看答案</p>
          </div>

          {flipped && !showResult && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-center text-green-500 mb-4 font-cute">
                答案: {currentQuestion.correctAnswer}
              </h3>
              {currentQuestion.example && (
                <p className="text-center text-gray-600 italic">
                  {currentQuestion.example}
                </p>
              )}
              <div className="mt-6">
                <p className="text-center text-gray-500 mb-4 font-cute">选择正确的中文意思:</p>
                <div className="grid grid-cols-2 gap-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(option)}
                      className={`p-4 rounded-xl font-cute transition-all ${
                        selectedAnswer === option
                          ? 'bg-pink-100 border-2 border-pink-400'
                          : 'bg-white/60 hover:bg-pink-50 border-2 border-transparent'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showResult && (
            <div className="mb-6">
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
                  <span>
                    正确答案: {currentQuestion.correctAnswer}
                  </span>
                )}
              </div>
              <Button onClick={handleNext} className="w-full mt-4">
                {currentIndex < questions.length - 1 ? '下一题' : '完成'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

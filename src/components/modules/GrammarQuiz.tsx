import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Question } from '../../types';
import CatAnimation from '../common/CatAnimation';
import Button from '../common/Button';

interface GrammarQuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export default function GrammarQuiz({ questions, onComplete }: GrammarQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
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
      setSelectedAnswer(null);
      setShowResult(false);
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
              <span className="text-xs bg-sky-100 text-sky-500 px-3 py-1 rounded-full font-cute">
                语法练习
              </span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-4 font-cute">
              {currentQuestion.question}
            </h2>
            
            {currentQuestion.hint && (
              <p className="text-sm text-gray-500 bg-cream-100 p-3 rounded-xl mb-4 font-cute">
                💡 提示: {currentQuestion.hint}
              </p>
            )}
          </div>

          {!showResult ? (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(option)}
                  className={`w-full p-4 rounded-xl font-cute transition-all flex items-center gap-3 ${
                    selectedAnswer === option
                      ? 'bg-pink-100 border-2 border-pink-400'
                      : 'bg-white/60 hover:bg-pink-50 border-2 border-transparent'
                  }`}
                >
                  <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-left">{option}</span>
                </button>
              ))}
            </div>
          ) : (
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
                  <span className="flex items-center justify-center gap-2">
                    <X className="w-5 h-5" />
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

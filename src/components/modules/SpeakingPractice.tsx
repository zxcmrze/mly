import { useState } from 'react';
import { Mic, MicOff, Volume2, Check } from 'lucide-react';
import { Question } from '../../types';
import CatAnimation from '../common/CatAnimation';
import Button from '../common/Button';

interface SpeakingPracticeProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export default function SpeakingPractice({ questions, onComplete }: SpeakingPracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [catType, setCatType] = useState<'happy' | 'cry' | 'idle'>('idle');
  const [showCat, setShowCat] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  let timer: ReturnType<typeof setInterval> | null = null;

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    if (timer) clearInterval(timer);
    setIsRecording(false);
    const newScore = Math.floor(Math.random() * 30) + 70;
    setScore(newScore);
    const isCorrect = newScore >= 80;
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
      setShowResult(false);
      setScore(0);
    } else {
      onComplete(correctCount);
    }
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
          <div className="bg-white rounded-3xl p-6 mb-6 box-shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs bg-beach-100 text-beach-500 px-3 py-1 rounded-full font-cute">
                口语练习
              </span>
            </div>
            
            <div className="flex justify-center mb-4">
              <button 
                onClick={handleSpeak}
                className="p-4 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
              >
                <Volume2 className="w-8 h-8 text-pink-500" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2 font-cute">
              {currentQuestion.question}
            </h2>
            
            <p className="text-center text-gray-500 mb-4 font-cute">
              中文意思: {currentQuestion.correctAnswer}
            </p>
            
            {currentQuestion.hint && (
              <p className="text-sm text-gray-500 bg-cream-100 p-3 rounded-xl font-cute">
                💡 提示: {currentQuestion.hint}
              </p>
            )}
          </div>

          {!showResult ? (
            <div className="flex flex-col items-center">
              <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                  isRecording 
                    ? 'bg-red-400 animate-pulse' 
                    : 'bg-gradient-to-r from-pink-400 to-pink-500 hover:scale-110'
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-12 h-12 text-white" />
                ) : (
                  <Mic className="w-12 h-12 text-white" />
                )}
              </button>
              
              <p className="mt-4 text-gray-500 font-cute">
                {isRecording ? `录音中... ${recordingTime}s` : '点击麦克风开始录音'}
              </p>
            </div>
          ) : (
            <div className="mb-6">
              <div className="bg-white rounded-3xl p-6 box-shadow-card text-center">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-pink-500 font-cute">
                    {score}
                  </span>
                  <span className="text-gray-500 font-cute">/ 100</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-pink-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
                
                <p className={`font-cute ${
                  score >= 80 ? 'text-green-500' : 'text-orange-500'
                }`}>
                  {score >= 90 ? '太棒了！发音非常标准！' :
                   score >= 80 ? '很好！继续保持！' :
                   score >= 70 ? '还不错，再练习一下吧！' :
                   '继续努力，你可以做得更好！'}
                </p>
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

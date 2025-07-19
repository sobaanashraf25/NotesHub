import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const allQuizzes = {
  mathematics: {
    6: [
      { question: "What is the successor of 999?", options: ["1000", "998", "1001", "9990"], correct: 0 },
      { question: "Which of these is a prime number?", options: ["9", "15", "17", "21"], correct: 2 },
    ],
    9: [
      { question: "Which of the following is irrational?", options: ["√4", "√9", "√7", "√16"], correct: 2 },
      { question: "The value of (2^0 + 7^0) / 5^0 is:", options: ["2", "0", "9/5", "1/5"], correct: 0 },
    ]
  },
  science: {
    6: [
      { question: "Which part of the plant makes food?", options: ["Root", "Stem", "Leaves", "Flower"], correct: 2 },
      { question: "Which of these is a source of Vitamin C?", options: ["Milk", "Orange", "Egg", "Rice"], correct: 1 },
    ],
    10: [
      { question: "What is the chemical formula for water?", options: ["H2O2", "HO2", "H2O", "CO2"], correct: 2 },
      { question: "Which lens is used in a magnifying glass?", options: ["Concave", "Convex", "Bifocal", "Cylindrical"], correct: 1 },
    ]
  },
  'social-science': {
    9: [
        { question: "When did the French Revolution start?", options: ["1789", "1776", "1857", "1914"], correct: 0 },
        { question: "What is the upper house of the Indian Parliament called?", options: ["Lok Sabha", "Vidhan Sabha", "Rajya Sabha", "Parliament House"], correct: 2 },
    ]
  }
};

const getQuizFor = (selectedClass, selectedSubject) => {
  const defaultQuiz = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    { question: "What is the color of the sky?", options: ["Green", "Red", "Blue", "Yellow"], correct: 2 },
    { question: "Which animal barks?", options: ["Cat", "Dog", "Cow", "Lion"], correct: 1 },
  ];

  if (allQuizzes[selectedSubject] && allQuizzes[selectedSubject][selectedClass]) {
    return allQuizzes[selectedSubject][selectedClass];
  }
  
  const subjectQuizzes = Object.values(allQuizzes[selectedSubject] || {}).flat();
  if (subjectQuizzes.length > 0) return subjectQuizzes.slice(0, 10);

  const allQuizzesFlat = Object.values(allQuizzes).map(s => Object.values(s)).flat(2);
  return allQuizzesFlat.length > 0 ? allQuizzesFlat.slice(0, 10) : defaultQuiz;
};


const QuizSection = ({ selectedClass, selectedSubject, onNavigate, onBack }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setQuizzes(getQuizFor(selectedClass, selectedSubject));
  }, [selectedClass, selectedSubject]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer! 🤔",
        description: "Choose one option before proceeding",
        variant: "destructive",
        className: 'bg-red-600 border-red-600 text-white'
      });
      return;
    }

    const isCorrect = selectedAnswer === quizzes[currentQuiz].correct;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job! Keep it up!",
        className: 'bg-green-600 border-green-600 text-white'
      });
    } else {
      toast({
        title: "Oops! ❌",
        description: `The correct answer was: ${quizzes[currentQuiz].options[quizzes[currentQuiz].correct]}`,
        className: 'bg-yellow-500 border-yellow-500 text-black'
      });
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuiz < quizzes.length - 1) {
        setCurrentQuiz(currentQuiz + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (quizzes.length === 0) {
    return (
        <div className="min-h-screen p-4 flex items-center justify-center text-white">
            Loading quiz...
        </div>
    );
  }

  if (quizCompleted) {
    const percentage = (score / quizzes.length) * 100;
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md mx-auto"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🏆
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Quiz Completed!</h2>
          <div className="text-5xl font-bold text-yellow-400 mb-2">{score}/{quizzes.length}</div>
          <div className="text-xl text-white mb-6">{percentage.toFixed(0)}% Score</div>
          
          <div className="space-y-4">
            <Button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <i className="fas fa-redo mr-2" />
              Try Again
            </Button>
            <Button
              onClick={() => onNavigate('home')}
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10"
            >
              <i className="fas fa-home mr-2" />
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 pt-4"
      >
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10 p-3 rounded-full"
        >
          <i className="fas fa-arrow-left text-xl" />
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white capitalize">{selectedSubject.replace('-', ' ')} Quiz</h1>
          <p className="text-sm text-gray-300">Class {selectedClass}</p>
        </div>
        <div className="text-white font-bold">
          Score: {score}
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuiz + 1) / quizzes.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuiz}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-6">{quizzes[currentQuiz].question}</h2>
            </div>

            <div className="space-y-4">
              {quizzes[currentQuiz].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    showResult
                      ? index === quizzes[currentQuiz].correct
                        ? 'bg-green-600 text-white ring-2 ring-white'
                        : selectedAnswer === index
                        ? 'bg-red-600 text-white'
                        : 'bg-white/10 text-white'
                      : selectedAnswer === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  whileHover={{ scale: showResult ? 1 : 1.02 }}
                  whileTap={{ scale: showResult ? 1 : 0.98 }}
                  disabled={showResult}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4 text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    {option}
                    {showResult && index === quizzes[currentQuiz].correct && (
                      <i className="fas fa-check ml-auto text-green-300" />
                    )}
                    {showResult && selectedAnswer === index && index !== quizzes[currentQuiz].correct && (
                      <i className="fas fa-times ml-auto text-red-300" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="text-center mt-8">
              {!showResult ? (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3"
                >
                  {currentQuiz === quizzes.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  <i className="fas fa-arrow-right ml-2" />
                </Button>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl"
                >
                  {selectedAnswer === quizzes[currentQuiz].correct ? '🎉' : '📚'}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizSection;
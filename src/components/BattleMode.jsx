
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BattleMode = ({ onNavigate, onBack }) => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, result
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [cpuHealth, setCpuHealth] = useState(100);
  const { toast } = useToast();

  const battleQuestions = [
    {
      question: "What is the fastest land animal?",
      options: ["Lion", "Cheetah", "Tiger", "Leopard"],
      correct: 1
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "What is 12 × 12?",
      options: ["144", "124", "134", "154"],
      correct: 0
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
      correct: 2
    },
    {
      question: "What is the largest ocean?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correct: 3
    }
  ];

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeUp();
    }
  }, [timeLeft, gameState]);

  const startBattle = () => {
    setGameState('playing');
    setPlayerScore(0);
    setCpuScore(0);
    setCurrentQuestion(0);
    setPlayerHealth(100);
    setCpuHealth(100);
    setTimeLeft(15);
    setSelectedAnswer(null);
  };

  const handleTimeUp = () => {
    // CPU gets point for timeout
    const newCpuScore = cpuScore + 1;
    setCpuScore(newCpuScore);
    setPlayerHealth(Math.max(0, playerHealth - 20));
    
    toast({
      title: "Time's Up! ⏰",
      description: "CPU scores a point!",
    });

    nextQuestion();
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === battleQuestions[currentQuestion].correct;
    
    // Simulate CPU answer (random with slight bias towards correct)
    const cpuAnswer = Math.random() < 0.7 ? battleQuestions[currentQuestion].correct : Math.floor(Math.random() * 4);
    const cpuCorrect = cpuAnswer === battleQuestions[currentQuestion].correct;

    if (isCorrect && !cpuCorrect) {
      setPlayerScore(playerScore + 1);
      setCpuHealth(Math.max(0, cpuHealth - 20));
      toast({
        title: "Critical Hit! ⚔️",
        description: "You damaged the CPU!",
      });
    } else if (!isCorrect && cpuCorrect) {
      setCpuScore(cpuScore + 1);
      setPlayerHealth(Math.max(0, playerHealth - 20));
      toast({
        title: "CPU Strikes! 🤖",
        description: "You took damage!",
      });
    } else if (isCorrect && cpuCorrect) {
      toast({
        title: "Draw! 🤝",
        description: "Both got it right!",
      });
    } else {
      toast({
        title: "Both Wrong! 😅",
        description: "No damage dealt!",
      });
    }

    setTimeout(nextQuestion, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestion < battleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(15);
    } else {
      endBattle();
    }
  };

  const endBattle = () => {
    setGameState('result');
    
    // Save score to leaderboard
    const currentLeaderboard = JSON.parse(localStorage.getItem('notesHub_leaderboard') || '[]');
    const newEntry = {
      name: 'Player',
      score: playerScore,
      mode: 'Battle',
      date: new Date().toLocaleDateString()
    };
    currentLeaderboard.push(newEntry);
    currentLeaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('notesHub_leaderboard', JSON.stringify(currentLeaderboard.slice(0, 10)));
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen p-4 relative overflow-hidden">
        {/* Header */}
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
          <h1 className="text-3xl font-bold text-white">⚔️ Battle Mode</h1>
          <div className="w-12" />
        </motion.div>

        {/* Battle Arena Preview */}
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-red-600 to-purple-700 rounded-2xl p-8 mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <motion.div
                  animate={{ bounce: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-2"
                >
                  🧑‍🎓
                </motion.div>
                <div className="text-white font-bold">YOU</div>
              </div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                ⚔️
              </motion.div>
              
              <div className="text-center">
                <motion.div
                  animate={{ bounce: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="text-6xl mb-2"
                >
                  🤖
                </motion.div>
                <div className="text-white font-bold">CPU</div>
              </div>
            </div>
            
            <div className="text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Knowledge Battle Arena</h2>
              <p className="mb-6">Answer questions faster than the CPU to win!</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="bg-white/10 rounded-lg p-3">
                  <i className="fas fa-clock text-yellow-400 mb-2" />
                  <div>15 seconds per question</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <i className="fas fa-heart text-red-400 mb-2" />
                  <div>100 HP each player</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <i className="fas fa-sword text-blue-400 mb-2" />
                  <div>20 damage per wrong answer</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <i className="fas fa-trophy text-yellow-400 mb-2" />
                  <div>Best of 5 questions</div>
                </div>
              </div>
            </div>
          </motion.div>

          <Button
            onClick={startBattle}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-12 py-4 text-xl font-bold rounded-xl"
          >
            <i className="fas fa-play mr-3" />
            Start Battle!
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    const winner = playerHealth > cpuHealth ? 'player' : cpuHealth > playerHealth ? 'cpu' : 'draw';
    
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md mx-auto"
        >
          <motion.div
            animate={{ rotate: winner === 'player' ? 360 : 0 }}
            transition={{ duration: 2 }}
            className="text-8xl mb-4"
          >
            {winner === 'player' ? '🏆' : winner === 'cpu' ? '🤖' : '🤝'}
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            {winner === 'player' ? 'Victory!' : winner === 'cpu' ? 'Defeat!' : 'Draw!'}
          </h2>
          
          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white">Your Score:</span>
              <span className="text-green-400 font-bold text-xl">{playerScore}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">CPU Score:</span>
              <span className="text-red-400 font-bold text-xl">{cpuScore}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={startBattle}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <i className="fas fa-redo mr-2" />
              Battle Again
            </Button>
            <Button
              onClick={onBack}
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

  // Playing state
  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Battle HUD */}
      <div className="flex justify-between items-center mb-6 pt-4">
        <div className="text-center">
          <div className="text-2xl mb-2">🧑‍🎓</div>
          <div className="text-white font-bold">YOU</div>
          <div className="w-24 bg-gray-600 rounded-full h-3 mt-2">
            <motion.div
              className="bg-green-500 h-full rounded-full"
              animate={{ width: `${playerHealth}%` }}
            />
          </div>
          <div className="text-white text-sm mt-1">{playerHealth} HP</div>
        </div>

        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-4xl text-yellow-400 mb-2"
          >
            {timeLeft}
          </motion.div>
          <div className="text-white text-sm">seconds left</div>
        </div>

        <div className="text-center">
          <div className="text-2xl mb-2">🤖</div>
          <div className="text-white font-bold">CPU</div>
          <div className="w-24 bg-gray-600 rounded-full h-3 mt-2">
            <motion.div
              className="bg-red-500 h-full rounded-full"
              animate={{ width: `${cpuHealth}%` }}
            />
          </div>
          <div className="text-white text-sm mt-1">{cpuHealth} HP</div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-sm text-purple-300 mb-2">Question {currentQuestion + 1} of {battleQuestions.length}</div>
          <h2 className="text-xl font-bold text-white">{battleQuestions[currentQuestion].question}</h2>
        </div>

        <div className="space-y-4">
          {battleQuestions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                selectedAnswer === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
              disabled={selectedAnswer !== null}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4 text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </div>
                {option}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattleMode;

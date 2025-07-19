
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Leaderboard = ({ onNavigate, onBack }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedMode, setSelectedMode] = useState('All');

  useEffect(() => {
    // Load leaderboard from localStorage
    const savedLeaderboard = JSON.parse(localStorage.getItem('notesHub_leaderboard') || '[]');
    
    // Add some mock data if empty
    if (savedLeaderboard.length === 0) {
      const mockData = [
        { name: 'Alex Champion', score: 95, mode: 'Quiz', date: '2024-01-15' },
        { name: 'Sarah Genius', score: 88, mode: 'Battle', date: '2024-01-14' },
        { name: 'Mike Scholar', score: 82, mode: 'Quiz', date: '2024-01-13' },
        { name: 'Emma Bright', score: 79, mode: 'Battle', date: '2024-01-12' },
        { name: 'David Smart', score: 76, mode: 'Quiz', date: '2024-01-11' },
        { name: 'Lisa Quick', score: 73, mode: 'Battle', date: '2024-01-10' },
        { name: 'Tom Clever', score: 70, mode: 'Quiz', date: '2024-01-09' },
        { name: 'Anna Swift', score: 67, mode: 'Battle', date: '2024-01-08' }
      ];
      setLeaderboardData(mockData);
      localStorage.setItem('notesHub_leaderboard', JSON.stringify(mockData));
    } else {
      setLeaderboardData(savedLeaderboard);
    }
  }, []);

  const filteredData = selectedMode === 'All' 
    ? leaderboardData 
    : leaderboardData.filter(entry => entry.mode === selectedMode);

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return 'from-yellow-400 to-orange-500';
      case 1: return 'from-gray-300 to-gray-500';
      case 2: return 'from-orange-400 to-yellow-600';
      default: return 'from-blue-400 to-purple-500';
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          >
            🏆
          </motion.div>
        ))}
      </div>

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
        <h1 className="text-3xl font-bold text-white">🏆 Leaderboard</h1>
        <div className="w-12" />
      </motion.div>

      {/* Filter Tabs */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex bg-white/10 rounded-xl p-1">
          {['All', 'Quiz', 'Battle'].map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                selectedMode === mode
                  ? 'bg-white text-gray-900'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="max-w-2xl mx-auto space-y-4">
        {filteredData.slice(0, 10).map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${getRankColor(index)} p-1 rounded-xl`}
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="text-3xl font-bold"
                    whileHover={{ scale: 1.2 }}
                  >
                    {getRankIcon(index)}
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{entry.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span className="flex items-center">
                        <i className={`fas ${entry.mode === 'Quiz' ? 'fa-brain' : 'fa-sword'} mr-1`} />
                        {entry.mode}
                      </span>
                      <span className="flex items-center">
                        <i className="fas fa-calendar mr-1" />
                        {entry.date}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{entry.score}</div>
                  <div className="text-sm text-gray-300">points</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-white mb-2">No scores yet!</h3>
          <p className="text-gray-300 mb-6">Play some quizzes or battles to see your scores here.</p>
          <Button
            onClick={() => onNavigate('quiz')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <i className="fas fa-play mr-2" />
            Start Playing
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Leaderboard;

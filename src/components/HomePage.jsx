import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HomePage = ({ onNavigate }) => {
  const menuItems = [
    { id: 'classes', icon: 'fas fa-graduation-cap', title: 'Study Notes', subtitle: 'Access NCERT notes by class & subject', color: 'from-blue-500 to-purple-600' },
    { id: 'quizSetup', icon: 'fas fa-brain', title: 'Daily Quiz', subtitle: '10+ quizzes per subject', color: 'from-green-500 to-teal-600' },
    { id: 'battle', icon: 'fas fa-sword', title: 'Battle Mode', subtitle: 'Compete with AI opponents', color: 'from-red-500 to-pink-600' },
    { id: 'leaderboard', icon: 'fas fa-trophy', title: 'Leaderboard', subtitle: 'See top performers', color: 'from-yellow-500 to-orange-600' },
    { id: 'chatbot', icon: 'fas fa-robot', title: 'AI Assistant', subtitle: 'Get instant help & answers', color: 'from-indigo-500 to-blue-600' },
    { id: 'settings', icon: 'fas fa-cog', title: 'Settings', subtitle: 'Customize your experience', color: 'from-gray-500 to-slate-600' }
  ];

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 pt-8"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4"
          style={{ backgroundSize: '200% 200%' }}
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          Notes Hub
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-300 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your Ultimate Learning Companion
        </motion.p>
        <motion.p 
          className="text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Made by <span className="text-purple-400 font-semibold">Sobaan Ashraf</span>
        </motion.p>
      </motion.div>

      {/* Menu Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => onNavigate(item.id)}
                className={`w-full h-32 p-6 bg-gradient-to-br ${item.color} hover:shadow-2xl hover:shadow-purple-500/25 border-0 rounded-2xl relative overflow-hidden group transition-all duration-300`}
              >
                {/* Animated background effect */}
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                  initial={false}
                  whileHover={{ opacity: 0.1 }}
                />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 2 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                  <motion.i 
                    className={`${item.icon} text-3xl mb-3`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-xs opacity-90 text-center">{item.subtitle}</p>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fun floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          >
            {['📚', '🎯', '🏆', '🤖', '⚡', '🌟'][i]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
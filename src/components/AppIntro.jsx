import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const PaperPlaneIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const AppIntro = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleGetStarted = () => {
    setStep(3);
    setTimeout(onComplete, 1000);
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <Button
              onClick={() => setStep(1)}
              className="bg-white text-black font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-purple-500/50 hover:bg-gray-200"
            >
              Start the Journey
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full absolute inset-0"
          >
            <motion.div
              initial={{ x: '-100vw', y: '50vh', rotate: -20 }}
              animate={{
                x: ['-100vw', '50vw', '150vw'],
                y: ['50vh', '-20vh', '40vh'],
                rotate: [-20, 20, -10],
              }}
              transition={{ duration: 3, ease: 'easeInOut' }}
              className="absolute"
            >
              <PaperPlaneIcon className="w-24 h-24 text-white" />
            </motion.div>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center text-white"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4"
              style={{ fontFamily: "'Kalam', cursive" }}
            >
              Notes Hub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-300 mb-8"
            >
              Your Ultimate Learning Companion
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Let's Go!
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-white/70 text-sm mt-12"
            >
              Made with ❤️ by <span className="text-purple-300 font-semibold">Sobaan Ashraf</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppIntro;
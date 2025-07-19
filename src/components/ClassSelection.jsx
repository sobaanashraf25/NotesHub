
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ClassSelection = ({ onNavigate, onBack }) => {
  const classes = [
    { id: 6, name: 'Class 6', icon: '📚', color: 'from-blue-500 to-cyan-600' },
    { id: 7, name: 'Class 7', icon: '📖', color: 'from-green-500 to-teal-600' },
    { id: 8, name: 'Class 8', icon: '📝', color: 'from-purple-500 to-indigo-600' },
    { id: 9, name: 'Class 9', icon: '🎓', color: 'from-orange-500 to-red-600' },
    { id: 10, name: 'Class 10', icon: '🏆', color: 'from-pink-500 to-rose-600' }
  ];

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
        <h1 className="text-3xl font-bold text-white">Select Your Class</h1>
        <div className="w-12" />
      </motion.div>

      {/* Class Grid */}
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => onNavigate('subjects', { class: classItem.id })}
                className={`w-full h-32 p-6 bg-gradient-to-br ${classItem.color} hover:shadow-2xl border-0 rounded-2xl relative overflow-hidden group`}
              >
                <div className="flex flex-col items-center justify-center h-full text-white">
                  <motion.div 
                    className="text-4xl mb-3"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {classItem.icon}
                  </motion.div>
                  <h3 className="font-bold text-xl">{classItem.name}</h3>
                  <p className="text-sm opacity-90">NCERT Curriculum</p>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;

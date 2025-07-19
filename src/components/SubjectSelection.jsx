import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const SubjectSelection = ({ selectedClass, onNavigate, onBack }) => {
  const getSubjectsForClass = (classNum) => {
    const subjects = [
      { id: 'mathematics', name: 'Mathematics', icon: '🔢', color: 'from-blue-500 to-cyan-600' },
      { id: 'science', name: 'Science', icon: '🔬', color: 'from-green-500 to-teal-600' },
      { id: 'social-science', name: 'Social Science', icon: '🌍', color: 'from-purple-500 to-indigo-600' },
      { id: 'english', name: 'English', icon: '📚', color: 'from-orange-500 to-red-600', books: classNum >= 9 ? 3 : 1 },
      { id: 'hindi', name: 'Hindi', icon: '🇮🇳', color: 'from-pink-500 to-rose-600', books: classNum >= 9 ? 3 : 2 }
    ];
    return subjects;
  };

  const subjects = getSubjectsForClass(selectedClass);

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
        <h1 className="text-3xl font-bold text-white">Class {selectedClass} Subjects</h1>
        <div className="w-12" />
      </motion.div>

      {/* Subjects Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => onNavigate('chapters', { subject: subject.id })}
                className={`w-full h-32 p-6 bg-gradient-to-br ${subject.color} hover:shadow-2xl border-0 rounded-2xl relative overflow-hidden group`}
              >
                <div className="flex flex-col items-center justify-center h-full text-white">
                  <motion.div 
                    className="text-4xl mb-3"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {subject.icon}
                  </motion.div>
                  <h3 className="font-bold text-lg">{subject.name}</h3>
                  {subject.books && (
                    <p className="text-xs opacity-90">{subject.books} {subject.books > 1 ? 'Books' : 'Book'}</p>
                  )}
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;
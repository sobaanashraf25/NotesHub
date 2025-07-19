import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ClassSelection from '@/components/ClassSelection';
import SubjectSelection from '@/components/SubjectSelection';

const QuizSetup = ({ onNavigate, onBack }) => {
  const [step, setStep] = useState('class'); // 'class' or 'subject'
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
    setStep('subject');
  };

  const handleSubjectSelect = (subjectId) => {
    onNavigate('quiz', { class: selectedClass, subject: subjectId });
  };

  const handleBack = () => {
    if (step === 'subject') {
      setStep('class');
    } else {
      onBack();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'class':
        return (
          <ClassSelection 
            onNavigate={(page, data) => handleClassSelect(data.class)} 
            onBack={handleBack} 
          />
        );
      case 'subject':
        return (
          <SubjectSelection 
            selectedClass={selectedClass} 
            onNavigate={(page, data) => handleSubjectSelect(data.subject)} 
            onBack={handleBack} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizSetup;
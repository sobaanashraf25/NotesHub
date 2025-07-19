import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import HomePage from '@/components/HomePage.jsx';
import ClassSelection from '@/components/ClassSelection.jsx';
import SubjectSelection from '@/components/SubjectSelection.jsx';
import ChapterSelection from '@/components/ChapterSelection.jsx';
import QuizSetup from '@/components/QuizSetup.jsx';
import QuizSection from '@/components/QuizSection.jsx';
import BattleMode from '@/components/BattleMode.jsx';
import Leaderboard from '@/components/Leaderboard.jsx';
import ChatBot from '@/components/ChatBot.jsx';
import Settings from '@/components/Settings.jsx';
import AppIntro from '@/components/AppIntro.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('intro');
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [theme, setTheme] = useState('purple');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const { toast } = useToast();
  const clickSoundRef = useRef(null);

  // Load preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('notesHub_theme') || 'purple';
    const savedSound = localStorage.getItem('notesHub_sound') !== 'false';
    const savedMusic = localStorage.getItem('notesHub_music') !== 'false';
    const savedAnimations = localStorage.getItem('notesHub_animations') !== 'false';
    const hasSeenIntro = localStorage.getItem('notesHub_intro_seen') === 'true';

    setTheme(savedTheme);
    setSoundEnabled(savedSound);
    setMusicEnabled(savedMusic);
    setAnimationsEnabled(savedAnimations);
    setShowIntro(!hasSeenIntro);

    if (hasSeenIntro) {
      setCurrentPage('home');
    }
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.className = `theme-${theme} font-sans`;
  }, [theme]);

  const playClickSound = () => {
    if (soundEnabled && clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(error => console.error("Error playing sound:", error));
    }
  };

  const handleNavigation = (page, data = {}) => {
    playClickSound();
    setCurrentPage(page);
    
    if (data.class !== undefined) setSelectedClass(data.class);
    if (data.subject !== undefined) setSelectedSubject(data.subject);
  };

  const handleIntroComplete = () => {
    localStorage.setItem('notesHub_intro_seen', 'true');
    setShowIntro(false);
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    if (showIntro) {
      return <AppIntro onComplete={handleIntroComplete} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'classes':
        return <ClassSelection onNavigate={handleNavigation} onBack={() => handleNavigation('home')} />;
      case 'subjects':
        return <SubjectSelection selectedClass={selectedClass} onNavigate={handleNavigation} onBack={() => handleNavigation('classes')} />;
      case 'chapters':
        return <ChapterSelection selectedClass={selectedClass} selectedSubject={selectedSubject} onNavigate={handleNavigation} onBack={() => handleNavigation('subjects', { class: selectedClass })} />;
      case 'quizSetup':
        return <QuizSetup onNavigate={handleNavigation} onBack={() => handleNavigation('home')} />;
      case 'quiz':
        return <QuizSection selectedClass={selectedClass} selectedSubject={selectedSubject} onNavigate={handleNavigation} onBack={() => handleNavigation('quizSetup')} />;
      case 'battle':
        return <BattleMode onNavigate={handleNavigation} onBack={() => handleNavigation('home')} />;
      case 'leaderboard':
        return <Leaderboard onNavigate={handleNavigation} onBack={() => handleNavigation('home')} />;
      case 'chatbot':
        return <ChatBot onNavigate={handleNavigation} onBack={() => handleNavigation('home')} />;
      case 'settings':
        return <Settings 
          theme={theme} 
          setTheme={setTheme}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          musicEnabled={musicEnabled}
          setMusicEnabled={setMusicEnabled}
          animationsEnabled={animationsEnabled}
          setAnimationsEnabled={setAnimationsEnabled}
          onNavigate={handleNavigation} 
          onBack={() => handleNavigation('home')} 
        />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Notes Hub - Educational App for Classes 6-10</title>
        <meta name="description" content="Complete educational app with NCERT notes, quizzes, battle mode, and interactive learning for students of classes 6-10" />
      </Helmet>
      
      <audio ref={clickSoundRef} src="/sounds/click.mp3" preload="auto"></audio>
      
      <div className={`min-h-screen app-container theme-${theme} ${!animationsEnabled ? 'no-animations' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: animationsEnabled ? 0.3 : 0 }}
            className="min-h-screen"
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
        
        <Toaster />
      </div>
    </>
  );
}

export default App;
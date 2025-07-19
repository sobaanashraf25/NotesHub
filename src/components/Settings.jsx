
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Settings = ({ 
  theme, 
  setTheme, 
  soundEnabled, 
  setSoundEnabled, 
  musicEnabled, 
  setMusicEnabled, 
  animationsEnabled, 
  setAnimationsEnabled, 
  onNavigate, 
  onBack 
}) => {
  const { toast } = useToast();

  const themes = [
    { id: 'light', name: 'Light', icon: '☀️', colors: 'from-gray-100 to-white' },
    { id: 'dark', name: 'Dark', icon: '🌙', colors: 'from-gray-800 to-gray-900' },
    { id: 'purple', name: 'Purple', icon: '💜', colors: 'from-purple-600 to-indigo-700' },
    { id: 'green', name: 'Green', icon: '🟢', colors: 'from-green-600 to-emerald-700' },
    { id: 'blue', name: 'Blue', icon: '🔵', colors: 'from-blue-600 to-cyan-700' },
    { id: 'orange', name: 'Orange', icon: '🟠', colors: 'from-orange-600 to-red-700' }
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('notesHub_theme', newTheme);
    toast({
      title: "Theme Updated! 🎨",
      description: `Switched to ${themes.find(t => t.id === newTheme)?.name} theme`,
    });
  };

  const handleSoundToggle = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('notesHub_sound', newValue.toString());
    toast({
      title: newValue ? "Sounds Enabled! 🔊" : "Sounds Disabled 🔇",
      description: newValue ? "Click sounds are now active" : "Click sounds are now muted",
    });
  };

  const handleMusicToggle = () => {
    const newValue = !musicEnabled;
    setMusicEnabled(newValue);
    localStorage.setItem('notesHub_music', newValue.toString());
    toast({
      title: newValue ? "Music Enabled! 🎵" : "Music Disabled 🔕",
      description: newValue ? "Background music is now playing" : "Background music is now muted",
    });
  };

  const handleAnimationsToggle = () => {
    const newValue = !animationsEnabled;
    setAnimationsEnabled(newValue);
    localStorage.setItem('notesHub_animations', newValue.toString());
    toast({
      title: newValue ? "Animations Enabled! ✨" : "Animations Disabled",
      description: newValue ? "Smooth animations are now active" : "Animations are now disabled for accessibility",
    });
  };

  const handleReset = () => {
    localStorage.removeItem('notesHub_theme');
    localStorage.removeItem('notesHub_sound');
    localStorage.removeItem('notesHub_music');
    localStorage.removeItem('notesHub_animations');
    
    setTheme('purple');
    setSoundEnabled(true);
    setMusicEnabled(true);
    setAnimationsEnabled(true);
    
    toast({
      title: "Settings Reset! 🔄",
      description: "All preferences have been restored to default",
    });
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-10"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
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
        <h1 className="text-3xl font-bold text-white">⚙️ Settings</h1>
        <div className="w-12" />
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Theme Selection */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <i className="fas fa-palette mr-3" />
            Theme Selection
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <motion.button
                key={themeOption.id}
                onClick={() => handleThemeChange(themeOption.id)}
                className={`p-4 rounded-xl bg-gradient-to-br ${themeOption.colors} relative overflow-hidden ${
                  theme === themeOption.id ? 'ring-4 ring-white/50' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center text-white">
                  <div className="text-2xl mb-2">{themeOption.icon}</div>
                  <div className="font-semibold">{themeOption.name}</div>
                </div>
                {theme === themeOption.id && (
                  <motion.div
                    className="absolute top-2 right-2 text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <i className="fas fa-check-circle" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sound Settings */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <i className="fas fa-volume-up mr-3" />
            Sound Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'} mr-3 text-lg`} />
                <span className="text-white">Click Sounds</span>
              </div>
              <motion.button
                onClick={handleSoundToggle}
                className={`w-16 h-8 rounded-full relative transition-colors ${
                  soundEnabled ? 'bg-green-500' : 'bg-gray-600'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full absolute top-1"
                  animate={{ x: soundEnabled ? 8 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <i className={`fas ${musicEnabled ? 'fa-music' : 'fa-music-slash'} mr-3 text-lg`} />
                <span className="text-white">Background Music</span>
              </div>
              <motion.button
                onClick={handleMusicToggle}
                className={`w-16 h-8 rounded-full relative transition-colors ${
                  musicEnabled ? 'bg-green-500' : 'bg-gray-600'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full absolute top-1"
                  animate={{ x: musicEnabled ? 8 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Accessibility Settings */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <i className="fas fa-universal-access mr-3" />
            Accessibility
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-magic mr-3 text-lg" />
              <span className="text-white">Enable Animations</span>
            </div>
            <motion.button
              onClick={handleAnimationsToggle}
              className={`w-16 h-8 rounded-full relative transition-colors ${
                animationsEnabled ? 'bg-green-500' : 'bg-gray-600'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full absolute top-1"
                animate={{ x: animationsEnabled ? 8 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Reset Settings */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            <i className="fas fa-undo mr-2" />
            Reset All Settings
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;

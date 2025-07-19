import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ChatBot = ({ onNavigate, onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm your AI study assistant. I can help you with homework, explain concepts, or answer any questions you have about your studies!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "Explain photosynthesis",
    "Help with algebra",
    "What is gravity?",
    "Grammar rules",
    "History of India",
    "Math formulas"
  ];

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    const knowledgeBase = {
      'photosynthesis': "🌱 Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to create their own food (glucose) and release oxygen. It's vital for life on Earth!",
      'algebra': "📊 Algebra uses letters (like x or y) to represent unknown numbers. The main rule is to keep the equation balanced. If you have 2x + 3 = 11, you'd subtract 3 from both sides to get 2x = 8, so x = 4.",
      'gravity': "🌍 Gravity is the invisible force that pulls objects towards each other. The more massive an object, the stronger its gravitational pull. It's what keeps us on the ground and the planets orbiting the sun.",
      'grammar': "📝 A key grammar rule is subject-verb agreement. For example, 'He runs' (singular subject, singular verb) vs. 'They run' (plural subject, plural verb). Also, remember the difference between 'your' (possessive) and 'you're' (you are).",
      'history of india': "🏛️ India's history is vast! It includes the ancient Indus Valley Civilization, the Maurya and Gupta Empires, the Mughal era, British colonial rule, and finally, independence in 1947 led by figures like Mahatma Gandhi.",
      'math formulas': "🔢 Some key formulas: Area of a circle is πr². The Pythagorean theorem for right-angled triangles is a² + b² = c². The quadratic formula helps solve equations of the form ax² + bx + c = 0.",
      'what is a cell': "🔬 A cell is the basic building block of all living things. It's like a tiny factory with different parts (organelles) that work together to keep the organism alive.",
      'who are you': "I'm Notes Hub's friendly AI assistant! I'm here to help you with your study questions. I'm still learning, so for complex topics, it's always best to consult your teacher or textbook. 🤖",
      'hello': "Hello there! How can I help you with your studies today?",
      'thank you': "You're welcome! I'm happy to help. Is there anything else you need assistance with? 😊"
    };

    for (const [key, response] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    const defaultResponses = [
      "That's a great question! While I'm not an expert on that specific topic yet, I can tell you that it's a fascinating area of study. I recommend checking your NCERT textbook for a detailed explanation. 📚",
      "I'm still learning about that! For the best information, it would be great to ask your teacher. They can provide a much more in-depth answer. 🧑‍🏫",
      "Interesting! I don't have the answer to that right now, but it sounds like a perfect question for a bit of research in your textbook or a discussion with your classmates. 💡",
      "My knowledge on that is limited at the moment. However, I'm always learning! Try asking me about a core concept like 'photosynthesis' or 'gravity'.",
      "That's a bit outside my current programming. I'm best at explaining fundamental concepts from your subjects. How about we try another question? 🤔"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleQuickQuestion = (question) => {
    const userMessage = {
      id: Date.now(),
      text: question,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(question),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 pt-4"
      >
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10 p-3 rounded-full"
        >
          <i className="fas fa-arrow-left text-xl" />
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">🤖 AI Assistant</h1>
          <p className="text-sm text-gray-300">Your study companion</p>
        </div>
        <div className="w-12" />
      </motion.div>

      <div className="flex-1 max-w-2xl mx-auto w-full mb-4 overflow-hidden flex flex-col">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 flex-1 overflow-y-auto">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-lg'
                    : 'bg-white/10 text-white rounded-bl-lg'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs opacity-70 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mb-4"
            >
              <div className="bg-white/10 text-white px-4 py-3 rounded-2xl rounded-bl-lg">
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full mb-4">
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <motion.button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-full text-xs transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {question}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="w-full bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
            >
              <i className="fas fa-paper-plane" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
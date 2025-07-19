import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ChapterSelection = ({ selectedClass, selectedSubject, onNavigate, onBack }) => {
  const { toast } = useToast();

  const getChaptersForSubject = (subject, classNum) => {
    const chapters = {
      mathematics: {
        6: ['Knowing Our Numbers', 'Whole Numbers', 'Playing with Numbers', 'Basic Geometrical Ideas', 'Understanding Elementary Shapes', 'Integers', 'Fractions', 'Decimals', 'Data Handling', 'Mensuration', 'Algebra', 'Ratio and Proportion', 'Symmetry', 'Practical Geometry'],
        7: ['Integers', 'Fractions and Decimals', 'Data Handling', 'Simple Equations', 'Lines and Angles', 'The Triangle and its Properties', 'Congruence of Triangles', 'Comparing Quantities', 'Rational Numbers', 'Practical Geometry', 'Perimeter and Area', 'Algebraic Expressions', 'Exponents and Powers', 'Symmetry', 'Visualising Solid Shapes'],
        8: ['Rational Numbers', 'Linear Equations in One Variable', 'Understanding Quadrilaterals', 'Practical Geometry', 'Data Handling', 'Squares and Square Roots', 'Cubes and Cube Roots', 'Comparing Quantities', 'Algebraic Expressions and Identities', 'Visualising Solid Shapes', 'Mensuration', 'Exponents and Powers', 'Direct and Inverse Proportions', 'Factorisation', 'Introduction to Graphs', 'Playing with Numbers'],
        9: ['Number Systems', 'Polynomials', 'Coordinate Geometry', 'Linear Equations in Two Variables', 'Introduction to Euclid’s Geometry', 'Lines and Angles', 'Triangles', 'Quadrilaterals', 'Areas of Parallelograms and Triangles', 'Circles', 'Constructions', 'Heron’s Formula', 'Surface Areas and Volumes', 'Statistics', 'Probability'],
        10: ['Real Numbers', 'Polynomials', 'Pair of Linear Equations in Two Variables', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Introduction to Trigonometry', 'Some Applications of Trigonometry', 'Circles', 'Constructions', 'Areas Related to Circles', 'Surface Areas and Volumes', 'Statistics', 'Probability']
      },
      science: {
        6: ['Food: Where Does It Come From?', 'Components of Food', 'Fibre to Fabric', 'Sorting Materials into Groups', 'Separation of Substances', 'Changes Around Us', 'Getting to Know Plants', 'Body Movements', 'The Living Organisms and Their Surroundings', 'Motion and Measurement of Distances', 'Light, Shadows and Reflections', 'Electricity and Circuits', 'Fun with Magnets', 'Water', 'Air Around Us', 'Garbage In, Garbage Out'],
        7: ['Nutrition in Plants', 'Nutrition in Animals', 'Fibre to Fabric', 'Heat', 'Acids, Bases and Salts', 'Physical and Chemical Changes', 'Weather, Climate and Adaptations of Animals to Climate', 'Winds, Storms and Cyclones', 'Soil', 'Respiration in Organisms', 'Transportation in Animals and Plants', 'Reproduction in Plants', 'Motion and Time', 'Electric Current and its Effects', 'Light', 'Water: A Precious Resource', 'Forests: Our Lifeline', 'Wastewater Story'],
        8: ['Crop Production and Management', 'Microorganisms: Friend and Foe', 'Synthetic Fibres and Plastics', 'Materials: Metals and Non-Metals', 'Coal and Petroleum', 'Combustion and Flame', 'Conservation of Plants and Animals', 'Cell - Structure and Functions', 'Reproduction in Animals', 'Reaching the Age of Adolescence', 'Force and Pressure', 'Friction', 'Sound', 'Chemical Effects of Electric Current', 'Some Natural Phenomena', 'Light', 'Stars and The Solar System', 'Pollution of Air and Water'],
        9: ['Matter in Our Surroundings', 'Is Matter Around Us Pure', 'Atoms and Molecules', 'Structure of the Atom', 'The Fundamental Unit of Life', 'Tissues', 'Diversity in Living Organisms', 'Motion', 'Force and Laws of Motion', 'Gravitation', 'Work and Energy', 'Sound', 'Why Do We Fall Ill', 'Natural Resources', 'Improvement in Food Resources'],
        10: ['Chemical Reactions and Equations', 'Acids, Bases and Salts', 'Metals and Non-metals', 'Carbon and its Compounds', 'Periodic Classification of Elements', 'Life Processes', 'Control and Coordination', 'How do Organisms Reproduce?', 'Heredity and Evolution', 'Light - Reflection and Refraction', 'Human Eye and Colourful World', 'Electricity', 'Magnetic Effects of Electric Current', 'Sources of Energy', 'Our Environment', 'Management of Natural Resources']
      },
      'social-science': {
        9: ['The French Revolution', 'Socialism in Europe and the Russian Revolution', 'Nazism and the Rise of Hitler', 'Forest Society and Colonialism', 'Pastoralists in the Modern World', 'India - Size and Location', 'Physical Features of India', 'Drainage', 'Climate', 'Natural Vegetation and Wildlife', 'Population', 'What is Democracy? Why Democracy?', 'Constitutional Design', 'Electoral Politics', 'Working of Institutions', 'Democratic Rights', 'The Story of Village Palampur', 'People as Resource', 'Poverty as a Challenge', 'Food Security in India'],
        10: ['The Rise of Nationalism in Europe', 'Nationalism in India', 'The Making of a Global World', 'The Age of Industrialisation', 'Print Culture and the Modern World', 'Resources and Development', 'Forest and Wildlife Resources', 'Water Resources', 'Agriculture', 'Minerals and Energy Resources', 'Manufacturing Industries', 'Lifelines of National Economy', 'Power Sharing', 'Federalism', 'Democracy and Diversity', 'Gender, Religion and Caste', 'Popular Struggles and Movements', 'Political Parties', 'Outcomes of Democracy', 'Challenges to Democracy', 'Development', 'Sectors of the Indian Economy', 'Money and Credit', 'Globalisation and the Indian Economy', 'Consumer Rights']
      },
      english: {
        9: {
          'Beehive (Prose)': ['The Fun They Had', 'The Sound of Music', 'The Little Girl', 'A Truly Beautiful Mind', 'The Snake and the Mirror', 'My Childhood', 'Packing', 'Reach for the Top', 'The Bond of Love', 'Kathmandu', 'If I Were You'],
          'Beehive (Poetry)': ['The Road Not Taken', 'Wind', 'Rain on the Roof', 'The Lake Isle of Innisfree', 'A Legend of the Northland', 'No Men Are Foreign', 'The Duck and the Kangaroo', 'On Killing a Tree', 'The Snake Trying', 'A Slumber Did My Spirit Seal'],
          'Moments (Supplementry)': ['The Lost Child', 'The Adventures of Toto', 'Iswaran the Storyteller', 'In the Kingdom of Fools', 'The Happy Prince', 'Weathering the Storm in Ersama', 'The Last Leaf', 'A House Is Not a Home', 'The Accidental Tourist', 'The Beggar']
        },
        10: {
          'First Flight (Prose)': ['A Letter to God', 'Nelson Mandela: Long Walk to Freedom', 'Two Stories about Flying', 'From the Diary of Anne Frank', 'The Hundred Dresses–I', 'The Hundred Dresses–II', 'Glimpses of India', 'Mijbil the Otter', 'Madam Rides the Bus', 'The Sermon at Benares', 'The Proposal'],
          'First Flight (Poetry)': ['Dust of Snow', 'Fire and Ice', 'A Tiger in the Zoo', 'How to Tell Wild Animals', 'The Ball Poem', 'Amanda!', 'Animals', 'The Trees', 'Fog', 'The Tale of Custard the Dragon', 'For Anne Gregory'],
          'Footprints Without Feet (Supplementry)': ['A Triumph of Surgery', 'The Thief\'s Story', 'The Midnight Visitor', 'A Question of Trust', 'Footprints without Feet', 'The Making of a Scientist', 'The Necklace', 'The Hack Driver', 'Bholi', 'The Book That Saved the Earth']
        }
      },
      hindi: {
        9: {
          'Kshitij (Prose)': ['दो बैलों की कथा', 'ल्हासा की ओर', 'उपभोक्तावाद की संस्कृति', 'साँवले सपनों की याद', 'नाना साहब की पुत्री देवी मैना को भस्म कर दिया गया', 'प्रेमचंद के फटे जूते', 'मेरे बचपन के दिन', 'एक कुत्ता और एक मैना'],
          'Kshitij (Poetry)': ['साखियाँ एवं सबद', 'वाख', 'सवैये', 'कैदी और कोकिला', 'ग्राम श्री', 'चंद्र गहना से लौटती बेर', 'मेघ आए', 'यमराज की दिशा', 'बच्चे काम पर जा रहे हैं'],
          'Kritika (Supplementry)': ['इस जल प्रलय में', 'मेरे संग की औरतें', 'रीढ़ की हड्डी', 'माटी वाली', 'किस तरह आखिरकार मैं हिंदी में आया']
        },
        10: {
          'Kshitij (Prose)': ['नेताजी का चश्मा', 'बालगोबिन भगत', 'लखनवी अंदाज़', 'मानवीय करुणा की दिव्य चमक', 'एक कहानी यह भी', 'स्त्री-शिक्षा के विरोधी कुतर्कों का खंडन', 'नौबतखाने में इबादत', 'संस्कृति'],
          'Kshitij (Poetry)': ['पद', 'राम-लक्ष्मण-परशुराम संवाद', 'सवैया और कवित्त', 'आत्मकथ्य', 'उत्साह और अट नहीं रही है', 'यह दंतुरहित मुसकान और फसल', 'छाया मत छूना', 'कन्यादान', 'संगतकार'],
          'Kritika (Supplementry)': ['माता का अँचल', 'जॉर्ज पंचम की नाक', 'साना-साना हाथ जोड़ि', 'एही ठैयाँ झुलनी हेरानी हो रामा!', 'मैं क्यों लिखता हूँ?']
        }
      }
    };

    const defaultChapters = ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5'];
    
    if (chapters[subject] && chapters[subject][classNum]) {
      return chapters[subject][classNum];
    }
    
    return chapters[subject] ? Object.values(chapters[subject]).flat().slice(0, 15) : defaultChapters;
  };

  const chapterData = getChaptersForSubject(selectedSubject, selectedClass);

  const handleChapterClick = (chapter) => {
    const driveLinks = [
      'https://drive.google.com/file/d/1example1/view',
      'https://drive.google.com/file/d/1example2/view',
      'https://drive.google.com/file/d/1example3/view'
    ];
    
    const randomLink = driveLinks[Math.floor(Math.random() * driveLinks.length)];
    
    toast({
      title: "📝 Opening Handwritten Notes",
      description: `Redirecting to ${chapter} notes...`,
      className: 'bg-blue-600 border-blue-600 text-white'
    });
    
    setTimeout(() => {
      window.open(randomLink, '_blank');
    }, 1000);
  };

  const renderChapters = () => {
    if (Array.isArray(chapterData)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapterData.map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => handleChapterClick(chapter)}
                className="w-full h-auto p-6 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 border-0 rounded-xl text-left relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg mb-1">{chapter}</h3>
                    <p className="text-sm text-gray-200 opacity-80">Handwritten Notes Available</p>
                  </div>
                  <div className="flex items-center space-x-2 pl-4">
                    <i className="fas fa-file-alt text-2xl text-white opacity-70" />
                    <motion.i 
                      className="fas fa-external-link-alt text-white opacity-70"
                      whileHover={{ scale: 1.2 }}
                    />
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5"
                  initial={false}
                  whileHover={{ opacity: 0.05 }}
                />
              </Button>
            </motion.div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {Object.entries(chapterData).map(([bookName, chapters], bookIndex) => (
          <motion.div 
            key={bookName}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: bookIndex * 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-purple-400 pb-2">{bookName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapters.map((chapter, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleChapterClick(chapter)}
                    className="w-full h-auto p-4 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 border-0 rounded-xl text-left relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white text-md">{chapter}</h3>
                      <motion.i 
                        className="fas fa-external-link-alt text-white opacity-70 ml-4"
                        whileHover={{ scale: 1.2 }}
                      />
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5"
                      initial={false}
                      whileHover={{ opacity: 0.05 }}
                    />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
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
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white capitalize">{selectedSubject.replace('-', ' ')}</h1>
          <p className="text-sm text-gray-300">Class {selectedClass}</p>
        </div>
        <div className="w-12" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {renderChapters()}
      </div>
    </div>
  );
};

export default ChapterSelection;
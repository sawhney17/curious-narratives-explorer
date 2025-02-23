import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter, Download, Share2, Leaf, Search, Bird, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import PlantMatchingGame from '@/components/PlantMatchingGame';

const DatasetViewer = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'story' | 'explore' | 'quiz'>('story');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // Sample story data for herbaria
  const herbariaStories = [
    {
      id: 1,
      title: "The Mystery of the Giant Water Lily",
      description: "Join Professor Bloom on an adventure to discover how the Victoria water lily can support the weight of a child!",
      image: "photo-1465146344425-f00d5f5c8f07",
      funFact: "The giant water lily's leaves can grow up to 3 meters wide!",
      question: "Why do you think the water lily's leaves are so strong?",
      interactivePrompt: "Click on different parts of the leaf to discover its secrets!"
    },
    {
      id: 2,
      title: "Time-Traveling Trees",
      description: "Travel back in time to meet trees that lived when dinosaurs roamed the Earth!",
      image: "photo-1518495973542-4542c06a5843",
      funFact: "Some trees can live for over 5,000 years!",
      question: "How do scientists know how old a tree is?",
      interactivePrompt: "Count the tree rings to discover its age!"
    },
    {
      id: 3,
      title: "The Secret Language of Flowers",
      description: "Decode the hidden messages plants use to communicate with each other!",
      image: "photo-1509316975850-ff9c5deb0cd9",
      funFact: "Plants can warn each other about danger using chemical signals!",
      question: "What other ways might plants communicate?",
      interactivePrompt: "Draw lines between plants to show how they might share messages!"
    }
  ];

  // Educational achievements
  const [achievements, setAchievements] = useState([
    { id: 'explorer', title: 'Plant Explorer', earned: false },
    { id: 'scientist', title: 'Junior Botanist', earned: false },
    { id: 'detective', title: 'Nature Detective', earned: false }
  ]);

  const handleShare = () => {
    toast.success('Share link copied to clipboard!');
  };

  const handleDownload = () => {
    toast.success('Download started!');
  };

  const earnAchievement = (id: string) => {
    setAchievements(prev => 
      prev.map(a => a.id === id ? { ...a, earned: true } : a)
    );
    toast.success(`🌟 You earned the ${achievements.find(a => a.id === id)?.title} badge!`);
  };

  const currentStory = herbariaStories[currentStoryIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Collections
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Discovery
              </Button>
            </div>
          </div>

          {/* View Selector */}
          <div className="flex gap-2 mb-6 justify-center">
            {(['story', 'explore', 'quiz'] as const).map((view) => (
              <Button
                key={view}
                variant={activeView === view ? 'default' : 'outline'}
                onClick={() => setActiveView(view)}
                className="capitalize"
              >
                {view === 'story' && 'Story Mode'}
                {view === 'explore' && 'Explorer Lab'}
                {view === 'quiz' && 'Plant Quiz'}
              </Button>
            ))}
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeView === 'story' && (
                <div className="max-w-4xl mx-auto">
                  <Card className="p-8 bg-white/90 backdrop-blur-sm">
                    <motion.div
                      key={currentStory.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-emerald-800">{currentStory.title}</h2>
                      <img 
                        src={`https://images.unsplash.com/${currentStory.image}`}
                        alt={currentStory.title}
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                      />
                      <p className="text-lg text-gray-700">{currentStory.description}</p>
                      
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-emerald-800 mb-2">🌟 Fun Fact!</h3>
                        <p>{currentStory.funFact}</p>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-amber-800 mb-2">🤔 Think About It</h3>
                        <p>{currentStory.question}</p>
                      </div>

                      <div className="flex justify-between mt-8">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setCurrentStoryIndex(prev => Math.max(0, prev - 1));
                            earnAchievement('explorer');
                          }}
                          disabled={currentStoryIndex === 0}
                        >
                          Previous Story
                        </Button>
                        <Button
                          onClick={() => {
                            setCurrentStoryIndex(prev => Math.min(herbariaStories.length - 1, prev + 1));
                            earnAchievement('explorer');
                          }}
                          disabled={currentStoryIndex === herbariaStories.length - 1}
                        >
                          Next Story
                        </Button>
                      </div>
                    </motion.div>
                  </Card>
                </div>
              )}

              {activeView === 'explore' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="p-6 bg-white/90 hover:bg-white transition-colors cursor-pointer"
                        onClick={() => earnAchievement('scientist')}>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Leaf className="w-12 h-12 text-emerald-500" />
                      <h3 className="text-xl font-semibold">Leaf Detective</h3>
                      <p className="text-gray-600">Use our special tools to examine leaves up close!</p>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-white/90 hover:bg-white transition-colors cursor-pointer"
                        onClick={() => earnAchievement('detective')}>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Search className="w-12 h-12 text-emerald-500" />
                      <h3 className="text-xl font-semibold">Plant Explorer</h3>
                      <p className="text-gray-600">Search for plants and discover their stories!</p>
                    </div>
                  </Card>

                  <Card className="p-6 bg-white/90 hover:bg-white transition-colors cursor-pointer">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <TreePine className="w-12 h-12 text-emerald-500" />
                      <h3 className="text-xl font-semibold">Tree Time Machine</h3>
                      <p className="text-gray-600">Travel through time to see how trees grow!</p>
                    </div>
                  </Card>
                </div>
              )}

              {activeView === 'quiz' && (
                <PlantMatchingGame />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Achievements Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-lg"
          >
            <h3 className="text-center font-semibold text-emerald-800 mb-4">Your Achievements</h3>
            <div className="flex justify-center gap-4">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`p-2 rounded-full ${
                    achievement.earned ? 'bg-emerald-200' : 'bg-gray-100'
                  }`}
                  title={achievement.earned ? 'Earned!' : 'Keep exploring to earn this badge!'}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    {achievement.earned ? '🌟' : '⭐'}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DatasetViewer;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Leaf, TreePine, Sprout, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

interface TaxonomyLevel {
  name: string;
  description: string;
  icon: React.ReactNode;
  funFact: string;
  image: string;
}

const taxonomyJourney: TaxonomyLevel[] = [
  {
    name: "Kingdom Plantae",
    description: "Welcome to the plant kingdom! This is where all plants belong, from tiny mosses to giant sequoias.",
    icon: <TreePine className="w-8 h-8 text-emerald-600" />,
    funFact: "Plants have been on Earth for about 500 million years!",
    image: "photo-1426604966848-d7adac402bff"
  },
  {
    name: "Division Tracheophyta",
    description: "These are vascular plants - they have special tissues to move water and nutrients throughout the plant.",
    icon: <Sprout className="w-8 h-8 text-emerald-600" />,
    funFact: "The first vascular plants appeared around 420 million years ago!",
    image: "photo-1518495973542-4542c06a5843"
  },
  {
    name: "Class Liliopsida",
    description: "Welcome to the monocots! These plants typically have flower parts in threes and parallel leaf veins.",
    icon: <Leaf className="w-8 h-8 text-emerald-600" />,
    funFact: "Grasses, orchids, and palms are all part of this class!",
    image: "photo-1465146344425-f00d5f5c8f07"
  },
  {
    name: "Order Poales",
    description: "These are the grass-like plants, including grasses, sedges, and rushes.",
    icon: <Sprout className="w-8 h-8 text-emerald-600" />,
    funFact: "This order includes some of the most important food crops like rice and corn!",
    image: "photo-1509316975850-ff9c5deb0cd9"
  },
  {
    name: "Family Cyperaceae",
    description: "The sedge family! These grass-like plants often live in wet areas.",
    icon: <Leaf className="w-8 h-8 text-emerald-600" />,
    funFact: "There's an old saying: 'Sedges have edges!' Their stems are often triangular!",
    image: "photo-1509316975850-ff9c5deb0cd9"
  }
];

const PlantDiscoveryStory: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showFunFact, setShowFunFact] = useState(false);

  const handleNext = () => {
    if (currentLevel < taxonomyJourney.length - 1) {
      setShowFunFact(false);
      setCurrentLevel(prev => prev + 1);
      toast.success("Great job! Let's learn about the next level!");
    }
  };

  const handlePrevious = () => {
    if (currentLevel > 0) {
      setShowFunFact(false);
      setCurrentLevel(prev => prev - 1);
    }
  };

  const currentItem = taxonomyJourney[currentLevel];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">
          Time Travel to 1912: A Plant Discovery Journey
        </h2>
        <p className="text-emerald-600">
          Follow the path of classification for a plant discovered on January 1st, 1912
        </p>
      </motion.div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card className="p-6 bg-white/90 backdrop-blur-sm hover:bg-white transition-colors">
              <div className="flex items-center gap-4 mb-4">
                {currentItem.icon}
                <h3 className="text-xl font-semibold text-emerald-700">
                  {currentItem.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{currentItem.description}</p>
              <Button 
                onClick={() => setShowFunFact(prev => !prev)}
                variant="outline"
                className="w-full"
              >
                {showFunFact ? "Hide Fun Fact" : "Show Fun Fact"}
              </Button>
              <AnimatePresence>
                {showFunFact && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-emerald-50 rounded-lg"
                  >
                    <p className="text-emerald-700">{currentItem.funFact}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            <div className="relative h-64 rounded-lg overflow-hidden">
              <img
                src={`https://images.unsplash.com/${currentItem.image}`}
                alt={currentItem.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentLevel === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Level
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentLevel === taxonomyJourney.length - 1}
            className="flex items-center gap-2"
          >
            Next Level
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {taxonomyJourney.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentLevel ? 'bg-emerald-600' : 'bg-emerald-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantDiscoveryStory;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getPlantFacts } from "@/lib/plantApi";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import flowerImage from '@/assets/flower.png';

interface PlantFact {
  fact: string;
  question: string;
  choices: string[];
  correctAnswer: string;
}

const PlantStory = () => {
  const [plantName, setPlantName] = useState("");
  const [facts, setFacts] = useState<PlantFact[]>([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isWatering, setIsWatering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  const handleSearch = async () => {
    if (!plantName.trim()) {
      toast({
        title: "Please enter a plant name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const plantFacts = await getPlantFacts(plantName);
      setFacts(plantFacts);
      setCurrentStage(0);
      setSelectedAnswer("");
      setIsAnswered(false);
    } catch (error) {
      toast({
        title: "Error fetching plant information",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = () => {
    if (!selectedAnswer) return;

    if (selectedAnswer === facts[currentStage].correctAnswer) {
      setIsWatering(true);
      setFeedback({
        message: `🌟 Amazing! ${
          currentStage === facts.length - 1
            ? "You've mastered all the facts about this plant!"
            : "Keep going, you're helping the plant grow with your knowledge!"
        }`,
        isCorrect: true
      });
      toast({
        title: "Correct!",
        description: "Your plant is thriving! ✨",
      });
      setIsAnswered(true);

      setTimeout(() => {
        setIsWatering(false);
        if (currentStage < facts.length - 1) {
          setCurrentStage(prev => prev + 1);
          setSelectedAnswer("");
          setIsAnswered(false);
          setFeedback(null);
        } else {
          // Final celebration message
          setTimeout(() => {
            setFeedback({
              message: "🎉 Congratulations! You've learned all about this plant. Try searching for another one!",
              isCorrect: true
            });
          }, 500);
        }
      }, 1500);
    } else {
      const hint = facts[currentStage].fact.split('.')[0].toLowerCase();
      setFeedback({
        message: `🤔 Not quite right! Here's a hint: Focus on the part about ${hint}. Try again!`,
        isCorrect: false
      });
      toast({
        title: "Keep trying!",
        description: "Your plant needs the correct answer to grow!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link to="/dataset/herbaria">
          <Button variant="ghost" className="flex items-center gap-2 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Explorer Lab
          </Button>
        </Link>

        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
            </div>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Input
              placeholder="Enter plant name..."
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </CardContent>
        </Card>

        {facts.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-green-800">
                {plantName}
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                {facts[currentStage].fact}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <p className="text-lg font-medium mb-4">{facts[currentStage].question}</p>
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  {facts[currentStage].choices.map((choice, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={choice} id={`choice-${index}`} />
                      <Label htmlFor={`choice-${index}`}>{choice}</Label>
                    </div>
                  ))}
                </RadioGroup>

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-lg mt-4 text-center font-medium ${
                      feedback.isCorrect
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {feedback.message}
                    {feedback.isCorrect && currentStage === facts.length - 1 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-2"
                      >
                        🌱 🌿 🌺
                      </motion.div>
                    )}
                  </motion.div>
                )}

                <Button
                  onClick={handleAnswer}
                  className="mt-4 bg-green-600 hover:bg-green-700 w-full"
                  disabled={isAnswered || !selectedAnswer}
                >
                  Water the Plant
                </Button>
              </div>

              <div className="flex justify-center space-x-4 mt-8">
                {facts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentStage
                        ? "bg-green-600"
                        : index < currentStage
                        ? "bg-green-300"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Plant Container */}
              <div className="relative h-40 mt-8">
                {/* Plant */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: 1,
                    height: `${(currentStage + 1) * 33}%`
                  }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20"
                >
                  <div className="absolute bottom-0 w-full">
                    {/* Plant Stem and Leaves */}
                    {currentStage < 2 && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-t from-green-600 to-green-400"
                        style={{
                          height: `${Math.min((currentStage + 1) * 40, 100)}px`,
                          transition: 'height 0.5s ease-out'
                        }}
                      >
                        {currentStage >= 1 && (
                          <>
                            <motion.div
                              initial={{ scale: 0, rotate: -45 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.5 }}
                              className="absolute -left-6 top-1/2 w-6 h-3 bg-gradient-to-r from-green-500 to-green-400 rounded-full origin-right"
                            />
                            <motion.div
                              initial={{ scale: 0, rotate: 45 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.5 }}
                              className="absolute -right-6 top-1/3 w-6 h-3 bg-gradient-to-l from-green-500 to-green-400 rounded-full origin-left"
                            />
                          </>
                        )}
                      </motion.div>
                    )}
                    {currentStage >= 2 && (
                      <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ 
                          scale: currentStage === facts.length - 1 && isAnswered ? 2 : 1,
                          rotate: 360 
                        }}
                        transition={{
                          duration: 0.8,
                          scale: {
                            duration: 1.5,
                            ease: "easeOut"
                          },
                          rotate: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }
                        }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2"
                      >
                        <img
                          src={flowerImage}
                          alt="Flower"
                          className="w-60 h-60 -mb-6 object-contain"
                          style={{
                            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))"
                          }}
                        />
                      </motion.div>
                    )}
                    {/* Soil */}
                    {currentStage < 2 && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-6">
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-900 to-amber-800 rounded-t-full" />
                        <div className="absolute inset-x-2 top-0 h-2 bg-gradient-to-t from-amber-800 to-amber-700 rounded-t-full" />
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Watering Animation */}
                <AnimatePresence>
                  {isWatering && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-1/2 top-0 w-px"
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 100 }}
                          transition={{
                            duration: 1,
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                          className="absolute h-4 w-1 rounded-full"
                          style={{
                            background: "linear-gradient(180deg, #60A5FA 0%, transparent 100%)",
                            left: `${(i - 2) * 3}px`
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PlantStory;

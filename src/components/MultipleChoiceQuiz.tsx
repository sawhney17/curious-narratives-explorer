import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast, Toaster } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface MultipleChoiceQuizProps {
  questions: Question[];
  onFinish?: () => void;
}

const MultipleChoiceQuiz = ({ questions, onFinish }: MultipleChoiceQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return; // Prevent changing answer after submission
    
    setSelectedAnswer(answerIndex);
    setHasAnswered(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    const question = questions[currentQuestion];

    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct!", {
        description: (
          <div className="flex items-start gap-2 mt-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-emerald-800">Great job!</p>
              <p className="text-emerald-600 mt-1">{question.explanation}</p>
            </div>
          </div>
        ),
        duration: 5000,
      });
    } else {
      toast.error("Not quite right", {
        description: (
          <div className="flex items-start gap-2 mt-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">
                The correct answer was: {question.options[question.correctAnswer]}
              </p>
              <p className="text-red-600 mt-1">{question.explanation}</p>
            </div>
          </div>
        ),
        duration: 5000,
      });
    }
  };

  const handleNext = () => {
    if (!hasAnswered) {
      toast.error("Please select an answer!");
      return;
    }

    if (currentQuestion === questions.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    }
  };

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Card className="p-8 bg-white shadow-lg border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">Quiz Complete!</h2>
          <p className="text-lg text-emerald-600 mb-4">
            You scored {score} out of {questions.length} ({percentage}%)
          </p>
          <Button
            onClick={onFinish}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 rounded-full font-semibold"
          >
            View Timeline
          </Button>
        </Card>
        <Toaster position="top-right" />
      </motion.div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Card className="p-8 bg-white shadow-lg border-emerald-100">
        <div className="mb-6">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <h3 className="text-xl font-semibold text-emerald-800">{question.question}</h3>
        </div>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: hasAnswered ? 1 : 1.02 }}
              whileTap={{ scale: hasAnswered ? 1 : 0.98 }}
            >
              <Button
                variant="outline"
                className={`w-full text-left p-4 ${
                  hasAnswered
                    ? index === question.correctAnswer
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                      : index === selectedAnswer
                      ? "bg-red-50 border-red-500 text-red-700"
                      : "opacity-50"
                    : selectedAnswer === index
                    ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                    : "hover:bg-emerald-50 hover:border-emerald-200"
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={hasAnswered}
              >
                <div className="flex items-center gap-2">
                  {hasAnswered && index === question.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  )}
                  {hasAnswered && index === selectedAnswer && index !== question.correctAnswer && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  {option}
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleNext}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 rounded-full font-semibold"
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next Question"}
          </Button>
        </div>
      </Card>
      <Toaster position="top-right" />
    </motion.div>
  );
};

export default MultipleChoiceQuiz;

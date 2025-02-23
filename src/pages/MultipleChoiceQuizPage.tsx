import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import MultipleChoiceQuiz from "@/components/MultipleChoiceQuiz";

const questions = [
  {
    id: 1,
    question: "What was the first step in our project's journey?",
    options: [
      "Launching the product",
      "Running beta tests",
      "Creating the initial concept",
      "Completing the design phase"
    ],
    correctAnswer: 2,
    explanation: "We started with creating the initial concept and vision for the project in January 2024, which laid the foundation for all subsequent development phases."
  },
  {
    id: 2,
    question: "What feedback did we receive during the product launch?",
    options: [
      "Mixed reactions",
      "Overwhelming positive feedback",
      "Negative feedback",
      "No feedback"
    ],
    correctAnswer: 1,
    explanation: "The product launch in April 2024 was met with overwhelming positive feedback from users, validating our development approach and design decisions."
  },
  {
    id: 3,
    question: "What did we do during the beta testing phase?",
    options: [
      "Launched the product",
      "Created the initial concept",
      "Completed the design",
      "Gathered valuable insights from select users"
    ],
    correctAnswer: 3,
    explanation: "During the beta testing phase in March 2024, we worked with a select group of users to gather valuable insights that helped improve the product before launch."
  },
  {
    id: 4,
    question: "What was incorporated into the design phase?",
    options: [
      "Only developer preferences",
      "No external input",
      "User feedback",
      "Random changes"
    ],
    correctAnswer: 2,
    explanation: "In the design phase (February 2024), we actively incorporated user feedback to enhance the interface and improve the overall user experience."
  }
];

const MultipleChoiceQuizPage = () => {
  const navigate = useNavigate();

  const handleQuizComplete = () => {
    navigate('/quiz');
  };

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
            <Link to="/quiz">
              <Button
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Timeline Quiz
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800"
            >
              Knowledge Check
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-4xl font-bold tracking-tight text-emerald-800 sm:text-5xl md:text-6xl"
            >
              Multiple Choice Quiz
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-3 max-w-md text-base text-emerald-600 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
            >
              Test your knowledge about our journey with these questions!
            </motion.p>
          </div>

          <MultipleChoiceQuiz 
            questions={questions} 
            onFinish={handleQuizComplete}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuizPage;

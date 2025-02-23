import { motion } from "framer-motion";
import HorizontalTimeline from "@/components/HorizontalTimeline";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TimelineQuizPage = () => {
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
            <Link to="/timeline">
              <Button
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Timeline
              </Button>
            </Link>
            <Link to="/multiple-choice">
              <Button
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
              >
                Try Multiple Choice Quiz
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800"
            >
              Timeline Quiz
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-4xl font-bold tracking-tight text-emerald-800 sm:text-5xl md:text-6xl"
            >
              Test Your Knowledge
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-3 max-w-md text-base text-emerald-600 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
            >
              Drag and drop the events to arrange them in chronological order.
            </motion.p>
          </div>

          <HorizontalTimeline 
            events={[
              {
                id: "4",
                date: "January 2024",
                title: "Initial Concept",
                description: "Started the journey with our initial concept and vision for the project.",
              },
              {
                id: "3",
                date: "February 2024",
                title: "Design Phase",
                description: "Completed the final design phase, incorporating user feedback and enhancing the interface.",
              },
              {
                id: "2",
                date: "March 2024",
                title: "Beta Testing",
                description: "Conducted extensive beta testing with a select group of users, gathering valuable insights.",
              },
              {
                id: "1",
                date: "April 2024",
                title: "Project Launch",
                description: "Successfully launched our flagship product to the market with overwhelming positive feedback.",
              }
            ]}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineQuizPage;

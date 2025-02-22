import Timeline from "@/components/Timeline";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TimelinePage = () => {
  const navigate = useNavigate();

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
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>

          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800"
            >
              Our Journey
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-4xl font-bold tracking-tight text-emerald-800 sm:text-5xl md:text-6xl"
            >
              Timeline
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-3 max-w-md text-base text-gray-600 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
            >
              Follow our journey as we build something amazing together.
            </motion.p>
          </div>
          <Timeline />
        </motion.div>
      </div>
    </div>
  );
};

export default TimelinePage;

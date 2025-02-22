import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
  isLeft: boolean;
  onClick?: () => void;
}

const TimelineEvent = ({ date, title, description, isLeft, onClick }: TimelineEventProps) => {
  return (
    <div className={`flex items-center ${isLeft ? "justify-start" : "justify-end"}`}>
      <div className={`w-5/12 ${!isLeft && "order-2"}`}>
        <Card 
          className="p-6 bg-white/90 backdrop-blur-sm hover:bg-white transition-colors cursor-pointer hover:shadow-lg"
          onClick={onClick}
        >
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="mb-2 inline-block rounded-full bg-emerald-100 px-2 py-1 text-sm font-medium text-emerald-800">
              {date}
            </span>
            <h3 className="mt-2 text-xl font-semibold text-emerald-800">
              {title}
            </h3>
            <p className="mt-2 text-gray-600">
              {description}
            </p>
          </motion.div>
        </Card>
      </div>
      <div className="z-10 flex w-2/12 items-center justify-center">
        <div className="h-4 w-4 rounded-full bg-emerald-400 shadow" />
      </div>
    </div>
  );
};

export default TimelineEvent;

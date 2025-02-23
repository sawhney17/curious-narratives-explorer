import { motion } from "framer-motion";
import { Card } from "./ui/card";

interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
  showDate?: boolean;
}

const HorizontalTimelineEvent = ({ date, title, description, showDate = true }: TimelineEventProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="p-4 bg-white shadow-lg border-emerald-100">
        {showDate && (
          <span className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800 mb-2">
            {date}
          </span>
        )}
        <h3 className="font-semibold text-emerald-800 mb-2">{title}</h3>
        <p className="text-sm text-emerald-600 line-clamp-2">{description}</p>
      </Card>
    </motion.div>
  );
};

export default HorizontalTimelineEvent;

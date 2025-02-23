import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Flag } from "lucide-react";

interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
  isLeft: boolean;
  onClick?: () => void;
  color?: string;
  isActive?: boolean;
  isLastEvent?: boolean;
  isCurrentEvent?: boolean;
  isWalking?: boolean;
  walkingToNext?: boolean;
}

const TimelineEvent = ({ 
  date, 
  title, 
  description, 
  isLeft, 
  onClick, 
  color = 'emerald',
  isActive = false,
  isLastEvent = false,
  isCurrentEvent = false,
  isWalking = false,
  walkingToNext = true
}: TimelineEventProps) => {
  const activeColor = 'blue';
  const currentColor = isActive ? activeColor : color;

  const StickFigure = () => (
    <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-${currentColor}-600`}>
      <circle cx="12" cy="4" r="4" fill="currentColor" />
      <motion.g
        animate={isWalking ? {
          y: [0, -2, 0],
        } : {}}
        transition={{
          repeat: Infinity,
          duration: 0.5,
        }}
      >
        <line x1="12" y1="8" x2="12" y2="20" stroke="currentColor" strokeWidth="2" />
        <motion.g
          animate={isWalking ? {
            rotate: [0, 20, 0, -20, 0],
          } : {}}
          transition={{
            repeat: Infinity,
            duration: 0.5,
          }}
        >
          <line x1="12" y1="12" x2="6" y2="16" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="12" x2="18" y2="16" stroke="currentColor" strokeWidth="2" />
        </motion.g>
        <motion.g
          animate={isWalking ? {
            rotate: [0, 30, 0, -30, 0],
          } : {}}
          transition={{
            repeat: Infinity,
            duration: 0.5,
          }}
        >
          <line x1="12" y1="20" x2="8" y2="28" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="20" x2="16" y2="28" stroke="currentColor" strokeWidth="2" />
        </motion.g>
      </motion.g>
    </svg>
  );

  return (
    <div className={`flex items-center ${isLeft ? "justify-start" : "justify-end"}`}>
      <div className={`w-5/12 ${!isLeft && "order-2"}`}>
        <Card 
          className={`p-6 bg-white/90 backdrop-blur-sm hover:bg-white transition-all cursor-pointer hover:shadow-lg border-${currentColor}-200 hover:border-${currentColor}-300`}
          onClick={onClick}
        >
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className={`absolute -top-3 ${isLeft ? '-right-3' : '-left-3'} text-${currentColor}-500`}>
              <MapPin className="h-6 w-6" />
            </div>
            
            <span className={`mb-2 inline-block rounded-full bg-${currentColor}-100 px-2 py-1 text-sm font-medium text-${currentColor}-800`}>
              {date}
            </span>
            <h3 className={`mt-2 text-xl font-semibold text-${currentColor}-800`}>
              {title}
            </h3>
            <p className="mt-2 text-gray-600">
              {description}
            </p>
          </motion.div>
        </Card>
      </div>
      <div className="z-10 flex w-2/12 items-center justify-center relative">
        <AnimatePresence mode="wait">
          {/* Walking Animation */}
          {isWalking ? (
            <motion.div 
              key="walking"
              className="absolute -bottom-8 left-1/2 -translate-x-1/2"
              initial={{ 
                y: 0,
                opacity: 1 
              }}
              animate={{ 
                y: walkingToNext ? '300px' : '-300px',
                opacity: 1 
              }}
              exit={{ 
                opacity: 0 
              }}
              transition={{ duration: 2, ease: "linear" }}
            >
              <StickFigure />
            </motion.div>
          ) : isCurrentEvent && (
            /* Static Stick Figure */
            <motion.div 
              key="static"
              className="absolute -bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <StickFigure />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className={`h-4 w-4 rounded-full ${
          isActive 
            ? 'bg-blue-600 ring-4 ring-blue-200' 
            : `bg-${color}-400 ring-4 ring-${color}-200`
        }`} />
        {isLastEvent && (
          <div className={`absolute -top-8 text-${currentColor}-500`}>
            <Flag className="h-8 w-8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineEvent;

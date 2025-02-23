import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TimelineEvent from "./TimelineEvent";
import { useState } from "react";

interface TimelineEventData {
  date: string;
  title: string;
  description: string;
  longDescription: string;
  image?: string;
  funFact?: string;
  thinkAboutIt?: string;
  color?: string;
}

interface TimelineProps {
  timelineEvents: TimelineEventData[];
}

const timelineEvents: TimelineEventData[] = [
  {
    date: "January 2024",
    title: "Initial Concept",
    description: "Started the journey with our initial concept and vision for the project.",
    longDescription: "The project began with a simple yet powerful idea: to make historical knowledge more accessible and engaging through interactive technology. We spent countless hours researching, brainstorming, and planning how to bring this vision to life while ensuring it would provide real value to users.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    funFact: "The initial idea came from a late-night conversation about how to make history more engaging for students!",
    thinkAboutIt: "What historical periods or events would you most want to explore through interactive technology?",
    color: "amber"
  },
  {
    date: "February 2024",
    title: "Design Phase",
    description: "Completed the final design phase, incorporating user feedback and enhancing the interface.",
    longDescription: "The design phase was focused on creating an intuitive and beautiful interface that would make complex historical data accessible to everyone. We conducted multiple user research sessions and iterative design sprints to ensure every element served a purpose while maintaining aesthetic appeal.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
    funFact: "We went through over 50 different design iterations before landing on our final interface design!",
    color: "purple"
  },
  {
    date: "March 2024",
    title: "Beta Testing",
    description: "Conducted extensive beta testing with a select group of users, gathering valuable insights.",
    longDescription: "Our beta testing phase was crucial in shaping the final product. We worked closely with a diverse group of users who provided invaluable feedback on usability, performance, and features. This collaborative approach helped us identify and address potential issues before the public launch.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    thinkAboutIt: "What role do you think user feedback plays in developing successful educational technology?",
    color: "blue"
  },
  {
    date: "April 2024",
    title: "Project Launch",
    description: "Successfully launched our flagship product to the market with overwhelming positive feedback.",
    longDescription: "After months of hard work and dedication, we finally launched our product to the public. The response was incredible, with users praising the intuitive interface and powerful features. This milestone marks the beginning of our journey to revolutionize how people interact with historical data.",
    image: "https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?q=80&w=2070&auto=format&fit=crop",
    funFact: "Our launch day saw over 10,000 users sign up within the first hour, breaking our initial projections!",
    thinkAboutIt: "How do you think technology like ours can help make history more accessible and engaging for future generations?",
    color: "emerald"
  }
];

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventData | null>(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [isWalking, setIsWalking] = useState(false);
  const [walkingFromIndex, setWalkingFromIndex] = useState<number | null>(null);
  const [walkingToIndex, setWalkingToIndex] = useState<number | null>(null);

  const handleEventClick = (event: TimelineEventData, index: number) => {
    setSelectedEvent(event);
    setCurrentEventIndex(index);
  };

  const goToNextEvent = () => {
    if (currentEventIndex < timelineEvents.length - 1) {
      setSelectedEvent(null);
      setWalkingFromIndex(currentEventIndex);
      setWalkingToIndex(currentEventIndex + 1);
      setIsWalking(true);
      setTimeout(() => {
        setIsWalking(false);
        setWalkingFromIndex(null);
        setWalkingToIndex(null);
        setCurrentEventIndex(currentEventIndex + 1);
        setSelectedEvent(timelineEvents[currentEventIndex + 1]);
      }, 2000);
    }
  };

  const goToPreviousEvent = () => {
    if (currentEventIndex > 0) {
      setSelectedEvent(null);
      setWalkingFromIndex(currentEventIndex);
      setWalkingToIndex(currentEventIndex - 1);
      setIsWalking(true);
      setTimeout(() => {
        setIsWalking(false);
        setWalkingFromIndex(null);
        setWalkingToIndex(null);
        setCurrentEventIndex(currentEventIndex - 1);
        setSelectedEvent(timelineEvents[currentEventIndex - 1]);
      }, 2000);
    }
  };

  return (
    <>
      <div className="relative mx-auto max-w-7xl py-16">
        {/* Timeline line */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5">
          {/* Background dashed line */}
          <div className="absolute inset-0 border-l-2 border-dashed border-gray-300"></div>

          {/* Blue progress line */}
          <div
            className="absolute top-0 left-0 w-0.5 bg-blue-600 transition-all duration-300"
            style={{
              height: currentEventIndex >= 0
                ? `calc(8% + ${currentEventIndex} * (75% / ${timelineEvents.length - 1}))`
                : '0%'
            }}
          ></div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-24"
          style={{
            gridTemplateRows: `repeat(${timelineEvents.length}, 1fr)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <TimelineEvent
                {...event}
                isLeft={index % 2 === 0}
                onClick={() => handleEventClick(event, index)}
                isActive={index <= currentEventIndex}
                isLastEvent={index === timelineEvents.length - 1}
                isCurrentEvent={index === currentEventIndex}
                isWalking={isWalking && index === walkingFromIndex}
                walkingToNext={walkingToIndex !== null && walkingToIndex > (walkingFromIndex ?? 0)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Dialog open={selectedEvent !== null} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto my-8">
          <DialogHeader className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-sm font-medium text-emerald-800">
                {selectedEvent?.date}
              </span>
              <span className="text-sm font-medium text-gray-500">
                Event {currentEventIndex + 1}/{timelineEvents.length}
              </span>
            </div>
            <DialogTitle className="text-2xl font-bold text-emerald-800">
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription className="mt-4 space-y-6">
              {selectedEvent?.image && (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
              <p className="text-gray-600 leading-relaxed">
                {selectedEvent?.longDescription}
              </p>

              <div className="grid gap-4 mt-6">
                {selectedEvent?.funFact && (
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-emerald-800 mb-2"> Fun Fact!</h3>
                    <p className="text-emerald-700">{selectedEvent.funFact}</p>
                  </div>
                )}

                {selectedEvent?.thinkAboutIt && (
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-amber-800 mb-2"> Think About It</h3>
                    <p className="text-amber-700">{selectedEvent.thinkAboutIt}</p>
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-4 mt-6 border-t sticky bottom-0 bg-white pb-2">
                <Button
                  variant="outline"
                  onClick={goToPreviousEvent}
                  disabled={currentEventIndex <= 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Event
                </Button>
                <Button
                  variant="outline"
                  onClick={goToNextEvent}
                  disabled={currentEventIndex >= timelineEvents.length - 1}
                  className="flex items-center gap-2"
                >
                  Next Event
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

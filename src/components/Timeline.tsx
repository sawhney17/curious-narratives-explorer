import { motion } from "framer-motion";
import { useState } from "react";
import TimelineEvent from "./TimelineEvent";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface TimelineEventData {
  date: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  funFact?: string;
  thinkAboutIt?: string;
}

const timelineEvents: TimelineEventData[] = [
  {
    date: "April 2024",
    title: "Project Launch",
    description: "Successfully launched our flagship product to the market with overwhelming positive feedback.",
    longDescription: "After months of hard work and dedication, we finally launched our product to the public. The response was incredible, with users praising the intuitive interface and powerful features. This milestone marks the beginning of our journey to revolutionize how people interact with historical data.",
    image: "https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?q=80&w=2070&auto=format&fit=crop",
    funFact: "Our launch day saw over 10,000 users sign up within the first hour, breaking our initial projections!",
    thinkAboutIt: "How do you think technology like ours can help make history more accessible and engaging for future generations?"
  },
  {
    date: "March 2024",
    title: "Beta Testing",
    description: "Conducted extensive beta testing with a select group of users, gathering valuable insights.",
    longDescription: "Our beta testing phase was crucial in shaping the final product. We worked closely with a diverse group of users who provided invaluable feedback on usability, performance, and features. This collaborative approach helped us identify and address potential issues before the public launch.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    thinkAboutIt: "What role do you think user feedback plays in developing successful educational technology?"
  },
  {
    date: "February 2024",
    title: "Design Phase",
    description: "Completed the final design phase, incorporating user feedback and enhancing the interface.",
    longDescription: "The design phase was focused on creating an intuitive and beautiful interface that would make complex historical data accessible to everyone. We conducted multiple user research sessions and iterative design sprints to ensure every element served a purpose while maintaining aesthetic appeal.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
    funFact: "We went through over 50 different design iterations before landing on our final interface design!"
  },
  {
    date: "January 2024",
    title: "Initial Concept",
    description: "Started the journey with our initial concept and vision for the project.",
    longDescription: "The project began with a simple yet powerful idea: to make historical knowledge more accessible and engaging through interactive technology. We spent countless hours researching, brainstorming, and planning how to bring this vision to life while ensuring it would provide real value to users.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    funFact: "The initial idea came from a late-night conversation about how to make history more engaging for students!",
    thinkAboutIt: "What historical periods or events would you most want to explore through interactive technology?"
  },
];

const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventData | null>(null);

  return (
    <>
      <div className="relative mx-auto max-w-7xl py-16">
        <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-emerald-200" />
        <motion.div
          className="space-y-16"
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
            >
              <TimelineEvent
                {...event}
                isLeft={index % 2 === 0}
                onClick={() => setSelectedEvent(event)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Dialog open={selectedEvent !== null} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="mb-2">
              <span className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-sm font-medium text-emerald-800">
                {selectedEvent?.date}
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
                    <h3 className="font-semibold text-emerald-800 mb-2"> 🌟 Fun Fact!</h3>
                    <p className="text-emerald-700">{selectedEvent.funFact}</p>
                  </div>
                )}

                {selectedEvent?.thinkAboutIt && (
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-amber-800 mb-2">🤔 Think About It</h3>
                    <p className="text-amber-700">{selectedEvent.thinkAboutIt}</p>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Timeline;

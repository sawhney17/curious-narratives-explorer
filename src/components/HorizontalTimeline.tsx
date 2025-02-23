import { useState, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import HorizontalTimelineEvent from "./HorizontalTimelineEvent";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
}

interface HorizontalTimelineProps {
  events: TimelineEvent[];
}

const HorizontalTimeline = ({ events }: HorizontalTimelineProps) => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  
  // Initialize with shuffled events
  useEffect(() => {
    const shuffledEvents = [...events].sort(() => Math.random() - 0.5);
    setTimelineEvents(shuffledEvents);
  }, [events]);

  const handleSubmit = () => {
    // Count how many events are in their correct position
    let correctCount = 0;
    timelineEvents.forEach((event, index) => {
      // Check if this event is in the same position as in the original array
      if (event.id === events[index].id) {
        correctCount++;
      }
    });

    // Calculate percentage
    const score = Math.round((correctCount / events.length) * 100);

    // Show toast with detailed feedback
    if (score === 100) {
      toast.success("Perfect! All events are in the correct order!");
    } else {
      toast.info(`You got ${correctCount} out of ${events.length} events in the right position (${score}%)`, {
        description: "Try again to get them all correct!",
      });
    }
  };

  return (
    <div className="mt-16 space-y-8">
      <div className="relative">
        <div className="absolute top-1/2 w-full h-px bg-emerald-200" />
        <Reorder.Group
          axis="x"
          values={timelineEvents}
          onReorder={setTimelineEvents}
          className="flex justify-between items-center relative"
        >
          {timelineEvents.map((event) => (
            <Reorder.Item
              key={event.id}
              value={event}
              className="w-1/4 px-2"
            >
              <HorizontalTimelineEvent {...event} showDate={false} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleSubmit}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 rounded-full font-semibold"
        >
          Check Order
        </Button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default HorizontalTimeline;

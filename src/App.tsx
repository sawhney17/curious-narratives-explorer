import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import DatasetViewer from "@/pages/DatasetViewer";
import NotFound from "@/pages/NotFound";
import VideoChat from "@/pages/VideoChat/VideoChat";
import Timeline from "@/pages/Timeline/Timeline";

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dataset/:type" element={<DatasetViewer />} />
          <Route path="/video-chat" element={<VideoChat />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

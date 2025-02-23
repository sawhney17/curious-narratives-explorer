import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import DatasetViewer from "@/pages/DatasetViewer";
import NotFound from "@/pages/NotFound";
import VideoChat from "@/pages/VideoChat/VideoChat";
import Timeline from "@/pages/Timeline/Timeline";
import TimelineQuiz from "@/pages/TimelineQuiz";
import MultipleChoiceQuizPage from "@/pages/MultipleChoiceQuizPage";
import Dashboard from "./pages/Dashboard";
import CSVLoader from "./components/CSVLoader";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [data, setData] = useState([]);
  const csvFilePath = '/runaway.csv';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dataset/:type" element={<DatasetViewer />} />
            <Route
              path="/dataset/:type/dashboard"
              element={
                <div style={{ padding: '20px' }}>
                  <h1>Historical Runaway Records Dashboard</h1>
                  {data.length === 0 ? (
                    <CSVLoader csvFilePath={csvFilePath} onDataLoaded={setData} />
                  ) : (
                    <Dashboard data={data} />
                  )}
                </div>
              }
            />
            <Route path="/video-chat" element={<VideoChat />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/quiz" element={<TimelineQuiz />} />
            <Route path="/multiple-choice" element={<MultipleChoiceQuizPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

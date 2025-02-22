
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TimelineChart from '../components/TimelineCharts';
import FeeAnalysisChart from '../components/FeeAnalysisChart';
import MapVisualization from '../components/MapVisualization';
import NetworkGraph from '../components/NetworkGraphs';
import { Button } from '@/components/ui/button';
import { ChartLine, Map, Network, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = ({ data }) => {
  const [selectedView, setSelectedView] = useState('timeline');

  const viewOptions = [
    {
      id: 'timeline',
      title: 'Plant Discovery Timeline',
      description: 'See when different plants were discovered over time',
      icon: <ChartLine className="w-5 h-5" />,
      component: TimelineChart
    },
    {
      id: 'distribution',
      title: 'Geographic Distribution',
      description: 'Explore where plants were found across different regions',
      icon: <Map className="w-5 h-5" />,
      component: MapVisualization
    },
    {
      id: 'relationships',
      title: 'Plant Relationships',
      description: 'Discover how different plants are connected',
      icon: <Network className="w-5 h-5" />,
      component: NetworkGraph
    },
    {
      id: 'analysis',
      title: 'Species Analysis',
      description: 'Compare different plant species and their characteristics',
      icon: <BarChart3 className="w-5 h-5" />,
      component: FeeAnalysisChart
    }
  ];

  const selectedOption = viewOptions.find(opt => opt.id === selectedView);

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      {/* View Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {viewOptions.map((option) => (
          <Card 
            key={option.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedView === option.id 
                ? 'ring-2 ring-emerald-500 bg-emerald-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedView(option.id)}
          >
            <CardHeader className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedView === option.id 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {option.icon}
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">{option.title}</CardTitle>
                  <CardDescription className="text-xs">{option.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Visualization Area */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>{selectedOption?.title}</CardTitle>
          <CardDescription>{selectedOption?.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg p-4">
                {selectedOption?.component && (
                  <selectedOption.component data={data} />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Educational Context */}
      <Card className="bg-emerald-50">
        <CardHeader>
          <CardTitle className="text-emerald-800">Did You Know?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-emerald-700">
            {selectedView === 'timeline' && "Plants have been documented and collected for hundreds of years! Each point on the timeline represents a new discovery."}
            {selectedView === 'distribution' && "Plants adapt to their environments! The map shows where different species thrive across various regions."}
            {selectedView === 'relationships' && "Plants are connected in amazing ways! Some plants are closely related, while others have evolved separately."}
            {selectedView === 'analysis' && "Scientists study plant characteristics to understand their roles in nature and how they might be useful to humans."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

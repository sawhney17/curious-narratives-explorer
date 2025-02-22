// src/components/Dashboard.js
import React, { useState } from 'react';
import TimelineChart from '../components/TimelineCharts';
import FeeAnalysisChart from '../components/FeeAnalysisChart';
import MapVisualization from '../components/MapVisualization';
import NetworkGraph from '../components/NetworkGraphs';

const Dashboard = ({ data }) => {
  const [selectedView, setSelectedView] = useState('timeline');

  const renderView = () => {
    switch (selectedView) {
      case 'timeline':
        return <TimelineChart data={data} />;
      case 'fee':
        return <FeeAnalysisChart data={data} />;
      case 'map':
        return <MapVisualization data={data} />;
      case 'network':
        return <NetworkGraph data={data} />;
      default:
        return <TimelineChart data={data} />;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setSelectedView('timeline')}>Timeline</button>
        <button onClick={() => setSelectedView('fee')}>Fee Analysis</button>
        <button onClick={() => setSelectedView('map')}>Map</button>
        <button onClick={() => setSelectedView('network')}>Network</button>
      </div>
      <div>{renderView()}</div>
    </div>
  );
};

export default Dashboard;
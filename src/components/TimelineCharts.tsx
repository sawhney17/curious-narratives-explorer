
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const TimelineChart = ({ data }) => {
  // Process data to count specimens per year
  const yearCounts = data.reduce((acc, item) => {
    if (item.year) {
      acc[item.year] = (acc[item.year] || 0) + 1;
    }
    return acc;
  }, {});

  // Convert to array format for Recharts
  const chartData = Object.entries(yearCounts)
    .map(([year, count]) => ({
      year: parseInt(year),
      specimens: count
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: 'Collection Year', position: 'bottom' }}
          />
          <YAxis
            label={{ 
              value: 'Number of Specimens',
              angle: -90,
              position: 'left'
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="specimens"
            stroke="#2ecc71"
            strokeWidth={2}
            dot={{ fill: '#2ecc71' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;

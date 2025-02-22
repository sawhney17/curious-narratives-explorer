// src/components/FeeAnalysisChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const FeeAnalysisChart = ({ data }) => {
  // Group by action and sum fees
  const groupedData = {};

  data.forEach(item => {
    const action = item['Action Taken'] || 'Unknown';
    const fee = typeof item['Fee Charged'] === 'string'
      ? parseFloat(item['Fee Charged'].replace('$','')) || 0
      : item['Fee Charged'] || 0;
      
    if (!groupedData[action]) {
      groupedData[action] = { action, totalFee: 0, count: 0 };
    }
    groupedData[action].totalFee += fee;
    groupedData[action].count += 1;
  });

  const chartData = Object.values(groupedData);

  return (
    <BarChart width={800} height={300} data={chartData}>
      <XAxis dataKey="action" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Bar dataKey="totalFee" fill="#82ca9d" />
    </BarChart>
  );
};

export default FeeAnalysisChart;
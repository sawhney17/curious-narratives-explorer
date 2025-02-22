// src/components/TimelineChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import moment from 'moment';

const TimelineChart = ({ data }) => {
  // Format and filter data for valid dates and fees
  const formattedData = data.map(item => {
    const date = moment(item['Date of Entry'], 'M/D/YYYY');
    return {
      ...item,
      date: date.isValid() ? date.toDate() : null,
      timestamp: date.isValid() ? date.valueOf() : null,
      fee: typeof item['Fee Charged'] === 'string'
        ? parseFloat(item['Fee Charged'].replace('$','')) || 0
        : item['Fee Charged'] || 0,
    };
  }).filter(item => item.date);

  // Sort by timestamp
  const sortedData = formattedData.sort((a, b) => a.timestamp - b.timestamp);

  return (
    <LineChart width={800} height={300} data={sortedData}>
      <XAxis
        dataKey="date"
        tickFormatter={(date) => moment(date).format('MM/DD/YYYY')}
      />
      <YAxis />
      <Tooltip labelFormatter={(value) => moment(value).format('MM/DD/YYYY')} />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="fee" stroke="#8884d8" />
    </LineChart>
  );
};

export default TimelineChart;
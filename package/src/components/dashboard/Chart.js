import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ data }) => {
  // Define colors or patterns for different status
  const statusColors = [
    { color: '#8884d8', label: 'queued' },
    { color: '#82ca9d', label: 'shortlisted' },
    { color: '#ffc658', label: '1st interview scheduled' },
    { color: '#ff7f0e', label: '2nd interview scheduled' },
    { color: '#2ca02c', label: '1st interview passed' },
    { color: '#33a02c', label: '2nd interview passed' },
    { color: '#d62728', label: '1st interview failed' },
    { color: '#e6550d', label: '2nd interview failed' },
    { color: '#8c564b', label: 'rejected' },
    { color: '#7b7b7b', label: 'hold off' },
    { color: '#17becf', label: 'hired' },
    { color: '#17#', label: 'N/A' }
    // Add more colors or patterns for other status
    
  ];

  // Prepare data for the chart
  const chartData = data.map(item => ({
    name: item.name,
    status: item.status_id ? item.status_id - 1 : 'Unknown', // Default to 'Unknown' if status_id is null
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis dataKey="status"  />
        <Tooltip />
        <Legend />
        {statusColors.map((status, index) => (
          <Bar key={index + 1} dataKey="status" name={status.label} fill={status.color} stackId="a" />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;

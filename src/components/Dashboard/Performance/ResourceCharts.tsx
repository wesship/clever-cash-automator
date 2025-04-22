
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TaskPerformanceData } from "./types";

export const ResourceUsageChart: React.FC<{ data: TaskPerformanceData[] }> = ({ data }) => (
  <div className="pt-4">
    <h4 className="text-sm font-medium mb-3">Resource Usage Over Time</h4>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="cpuUsage" 
          name="CPU %" 
          stroke="#8b5cf6" 
          activeDot={{ r: 8 }} 
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="memoryUsage" 
          name="Memory (MB)" 
          stroke="#ec4899" 
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const ResponseTimeChart: React.FC<{ data: TaskPerformanceData[] }> = ({ data }) => (
  <div className="pt-4">
    <h4 className="text-sm font-medium mb-3">Response Time (ms)</h4>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="responseTime" 
          name="Response Time (ms)" 
          stroke="#f97316" 
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

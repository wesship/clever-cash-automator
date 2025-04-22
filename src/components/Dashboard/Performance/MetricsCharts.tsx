
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { TaskPerformanceData } from "./types";

export const EarningsChart: React.FC<{ data: TaskPerformanceData[] }> = ({ data }) => (
  <div className="pt-4">
    <h4 className="text-sm font-medium mb-3">Earnings Trend</h4>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
        <Line 
          type="monotone" 
          dataKey="earnings" 
          name="Earnings" 
          stroke="#10b981" 
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const ErrorsChart: React.FC<{ data: TaskPerformanceData[] }> = ({ data }) => (
  <div className="pt-4">
    <h4 className="text-sm font-medium mb-3">Errors & Retries</h4>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="errors" name="Errors" fill="#ef4444" />
        <Bar dataKey="retries" name="Retries" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

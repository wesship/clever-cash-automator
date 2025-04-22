
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TaskPerformanceData } from "./types";

export const CompletionChart: React.FC<{ data: TaskPerformanceData[] }> = ({ data }) => {
  return (
    <div className="pt-4">
      <h4 className="text-sm font-medium mb-3">Completion Progress Over Time</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="completion" 
            name="Completion %" 
            stroke="#0ea5e9" 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

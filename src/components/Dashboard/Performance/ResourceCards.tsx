
import React from "react";
import { TaskPerformanceData } from "./types";

interface ResourceCardsProps {
  latestPerformance: TaskPerformanceData | null;
}

export const ResourceCards: React.FC<ResourceCardsProps> = ({ latestPerformance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">CPU Usage</h4>
        <div className="bg-muted/40 rounded-md p-4">
          <div className="text-2xl font-bold">{latestPerformance?.cpuUsage.toFixed(1)}%</div>
          <div className="text-sm text-muted-foreground">Average CPU utilization</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Memory Usage</h4>
        <div className="bg-muted/40 rounded-md p-4">
          <div className="text-2xl font-bold">{latestPerformance?.memoryUsage.toFixed(1)} MB</div>
          <div className="text-sm text-muted-foreground">Average memory usage</div>
        </div>
      </div>
    </div>
  );
};

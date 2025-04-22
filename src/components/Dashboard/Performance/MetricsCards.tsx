
import React from "react";
import { TaskPerformanceData } from "./types";

interface MetricsCardsProps {
  latestPerformance: TaskPerformanceData | null;
  averageErrorRate: number;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({
  latestPerformance,
  averageErrorRate,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Earnings</h4>
        <div className="bg-muted/40 rounded-md p-4">
          <div className="text-2xl font-bold">${latestPerformance?.earnings.toFixed(2) || '0.00'}</div>
          <div className="text-sm text-muted-foreground">Current earnings</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Error Rate</h4>
        <div className="bg-muted/40 rounded-md p-4">
          <div className="text-2xl font-bold">{averageErrorRate.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">Errors per execution</div>
        </div>
      </div>
    </div>
  );
};


import React, { memo } from "react";
import { Progress } from "@/components/ui/progress";
import { formatTime } from "./utils";

interface ProgressVisualizationProps {
  progress: number;
  currentStepDescription: string;
  executionTime: number;
}

const ProgressVisualization = memo(({ 
  progress, 
  currentStepDescription, 
  executionTime 
}: ProgressVisualizationProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="bg-background/50 p-3 rounded-md">
        <p className="text-sm font-medium">Current Operation:</p>
        <p className="text-sm">{currentStepDescription || "Not running"}</p>
        {executionTime > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Execution time: {formatTime(executionTime)}
          </p>
        )}
      </div>
    </div>
  );
});

ProgressVisualization.displayName = 'ProgressVisualization';

export default ProgressVisualization;

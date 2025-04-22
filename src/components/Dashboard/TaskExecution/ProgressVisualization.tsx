
import React from "react";
import { Progress } from "@/components/ui/progress";
import { formatTime } from "@/lib/utils";
import { Clock } from "lucide-react";

interface ProgressVisualizationProps {
  progress: number;
  currentStepDescription: string;
  executionTime: number; // in seconds
  className?: string;
}

const ProgressVisualization: React.FC<ProgressVisualizationProps> = ({
  progress,
  currentStepDescription,
  executionTime,
  className
}) => {
  return (
    <div className={className}>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">{progress}%</div>
          <div className="text-sm text-muted-foreground">
            {currentStepDescription || "Not running"}
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        {executionTime > 0 && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span>Execution time: {formatTime(executionTime)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressVisualization;


import React from "react";
import { Clock, Hourglass, Check, Loader2, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatTime } from "./utils";

interface ProgressStatsProps {
  overallProgress: number;
  elapsedTime: number | null;
  timeRemaining: string | null;
  stepCounts: Record<string, number>;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ 
  overallProgress, 
  elapsedTime, 
  timeRemaining,
  stepCounts 
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-3">
          <span>Overall Progress</span>
          <div className="flex items-center gap-2 text-xs">
            {stepCounts.completed && (
              <span className="flex items-center gap-1 text-green-500">
                <Check className="h-3 w-3" /> 
                {stepCounts.completed}
              </span>
            )}
            {stepCounts["in-progress"] && (
              <span className="flex items-center gap-1 text-blue-500">
                <Loader2 className="h-3 w-3 animate-spin" /> 
                {stepCounts["in-progress"]}
              </span>
            )}
            {stepCounts.error && (
              <span className="flex items-center gap-1 text-destructive">
                <AlertTriangle className="h-3 w-3" /> 
                {stepCounts.error}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {elapsedTime && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {formatTime(elapsedTime)}
            </span>
          )}
          {timeRemaining && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Hourglass className="h-3 w-3" /> ~{timeRemaining} remaining
            </span>
          )}
          <span className="font-medium">{Math.round(overallProgress)}%</span>
        </div>
      </div>
      <Progress value={overallProgress} className="h-2" />
    </div>
  );
};

export default ProgressStats;

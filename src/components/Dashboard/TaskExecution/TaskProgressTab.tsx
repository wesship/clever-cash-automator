
import React from "react";
import { Progress } from "@/components/ui/progress";
import TaskExecutionProgress from "./TaskExecutionProgress";

interface TaskProgressTabProps {
  progress: number;
  currentStepDescription: string;
  executionSteps: Array<{
    name: string;
    status: "pending" | "in-progress" | "completed" | "error";
    duration?: number;
    message?: string;
  }>;
  currentStepIndex: number;
  isRunning: boolean;
  executionTime: number;
}

const TaskProgressTab: React.FC<TaskProgressTabProps> = ({
  progress,
  currentStepDescription,
  executionSteps,
  currentStepIndex,
  isRunning,
  executionTime
}) => {
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
      </div>
      
      {/* Step Progress Visualization */}
      {executionSteps.length > 0 && (
        <TaskExecutionProgress
          steps={executionSteps}
          currentStepIndex={currentStepIndex}
          overallProgress={progress}
          startTime={isRunning ? new Date(Date.now() - executionTime * 1000) : undefined}
        />
      )}
    </div>
  );
};

export default TaskProgressTab;


import React, { memo } from "react";
import ProgressVisualization from "./ProgressVisualization";
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

const TaskProgressTab = memo(({
  progress,
  currentStepDescription,
  executionSteps,
  currentStepIndex,
  isRunning,
  executionTime
}: TaskProgressTabProps) => {
  return (
    <div className="space-y-4">
      <ProgressVisualization
        progress={progress}
        currentStepDescription={currentStepDescription}
        executionTime={executionTime}
      />
      
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
});

TaskProgressTab.displayName = 'TaskProgressTab';

export default TaskProgressTab;


import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ProgressStats from "./ProgressStats";
import StepList from "./StepList";
import { countStepsByStatus } from "@/lib/utils/step-utils";
import { estimateTimeRemaining } from "@/lib/utils/time-utils";

interface StepStatus {
  name: string;
  status: "pending" | "in-progress" | "completed" | "error";
  duration?: number;
  message?: string;
  startTime?: Date;
}

interface TaskExecutionProgressProps {
  steps: StepStatus[];
  currentStepIndex: number;
  overallProgress: number;
  startTime?: Date;
  className?: string;
  compact?: boolean;
}

const TaskExecutionProgress: React.FC<TaskExecutionProgressProps> = ({
  steps,
  currentStepIndex,
  overallProgress,
  startTime,
  className,
  compact = false
}) => {
  // Calculate elapsed time if startTime is provided
  const elapsedTime = startTime 
    ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) 
    : null;
  
  // Get time remaining estimate
  const timeRemaining = elapsedTime ? estimateTimeRemaining(elapsedTime, overallProgress) : null;
  
  // Count steps by status
  const stepCounts = countStepsByStatus(steps);
  
  return (
    <Card className={cn("bg-background/50", className)}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <ProgressStats
            overallProgress={overallProgress}
            elapsedTime={elapsedTime}
            timeRemaining={timeRemaining}
            stepCounts={stepCounts}
          />
          
          {steps.length > 0 && (
            <StepList
              steps={steps}
              currentStepIndex={currentStepIndex}
              compact={compact}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskExecutionProgress;


import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepStatus {
  name: string;
  status: "pending" | "in-progress" | "completed" | "error";
  duration?: number;
  message?: string;
}

interface TaskExecutionProgressProps {
  steps: StepStatus[];
  currentStepIndex: number;
  overallProgress: number;
  className?: string;
}

const TaskExecutionProgress: React.FC<TaskExecutionProgressProps> = ({
  steps,
  currentStepIndex,
  overallProgress,
  className
}) => {
  return (
    <Card className={cn("bg-background/50", className)}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          
          <div className="space-y-3 mt-4">
            {steps.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isPast = index < currentStepIndex;
              
              return (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center py-1.5 px-2 rounded-md transition-colors",
                    isActive && "bg-primary/10 border border-primary/20",
                    isPast && "opacity-70"
                  )}
                >
                  {step.status === "pending" && <Clock className="h-4 w-4 text-muted-foreground mr-2" />}
                  {step.status === "in-progress" && <Loader2 className="h-4 w-4 text-primary mr-2 animate-spin" />}
                  {step.status === "completed" && <Check className="h-4 w-4 text-green-500 mr-2" />}
                  {step.status === "error" && <AlertTriangle className="h-4 w-4 text-destructive mr-2" />}
                  
                  <div className="flex justify-between w-full">
                    <span className={cn(
                      "text-sm",
                      isActive && "font-medium"
                    )}>
                      {step.name}
                    </span>
                    
                    {step.duration && (
                      <span className="text-xs text-muted-foreground ml-2">
                        {step.duration}s
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskExecutionProgress;

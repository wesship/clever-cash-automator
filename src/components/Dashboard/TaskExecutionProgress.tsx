
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, AlertTriangle, Loader2, Info, Hourglass, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [showAllSteps, setShowAllSteps] = React.useState(!compact);
  
  // Calculate elapsed time if startTime is provided
  const elapsedTime = startTime 
    ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) 
    : null;
  
  // Format elapsed time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Estimate time remaining based on progress and elapsed time
  const estimateTimeRemaining = (): string | null => {
    if (!elapsedTime || overallProgress <= 0) return null;
    
    // Calculate seconds per percent progress
    const secondsPerPercent = elapsedTime / overallProgress;
    // Calculate remaining seconds
    const remainingSeconds = Math.round(secondsPerPercent * (100 - overallProgress));
    
    if (remainingSeconds <= 0) return null;
    return formatTime(remainingSeconds);
  };
  
  // Get time remaining estimate
  const timeRemaining = estimateTimeRemaining();
  
  // Get visible steps based on compact mode
  const visibleSteps = showAllSteps 
    ? steps 
    : compact
      ? steps.filter((_, index) => 
          index === currentStepIndex || 
          index === currentStepIndex - 1 || 
          index === currentStepIndex + 1 ||
          index === 0 || 
          index === steps.length - 1
        )
      : steps;
  
  // Count steps by status
  const stepCounts = steps.reduce((acc, step) => {
    acc[step.status] = (acc[step.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <Card className={cn("bg-background/50", className)}>
      <CardContent className="pt-6">
        <div className="space-y-4">
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
          
          <Collapsible 
            open={showAllSteps} 
            onOpenChange={setShowAllSteps}
            className="space-y-3 mt-4"
          >
            {visibleSteps.map((step, index) => {
              const isActive = steps.indexOf(step) === currentStepIndex;
              const isPast = steps.indexOf(step) < currentStepIndex;
              
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className={cn(
                          "flex items-center py-1.5 px-2 rounded-md transition-colors",
                          isActive && "bg-primary/10 border border-primary/20",
                          isPast && "opacity-70",
                          step.status === "error" && "bg-destructive/10 border-destructive/20",
                          "hover:bg-accent/50 cursor-default"
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
                          
                          <div className="flex items-center gap-2">
                            {step.duration && (
                              <span className="text-xs text-muted-foreground">
                                {step.duration}s
                              </span>
                            )}
                            {step.message && (
                              <Info className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    {step.message && (
                      <TooltipContent side="right">
                        <p className="max-w-xs">{step.message}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              );
            })}
            
            {compact && steps.length > 5 && (
              <CollapsibleTrigger asChild>
                <button 
                  className="w-full flex items-center justify-center py-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {showAllSteps ? (
                    <div className="flex items-center gap-1">
                      <ChevronUp className="h-3 w-3" />
                      <span>Show less</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <ChevronDown className="h-3 w-3" />
                      <span>Show all {steps.length} steps</span>
                    </div>
                  )}
                </button>
              </CollapsibleTrigger>
            )}
            
            <CollapsibleContent className="space-y-3">
              {compact && !showAllSteps ? null : steps.slice(visibleSteps.length).map((step, index) => {
                const isActive = steps.indexOf(step) === currentStepIndex;
                const isPast = steps.indexOf(step) < currentStepIndex;
                
                return (
                  <TooltipProvider key={`hidden-${index}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          className={cn(
                            "flex items-center py-1.5 px-2 rounded-md transition-colors",
                            isActive && "bg-primary/10 border border-primary/20",
                            isPast && "opacity-70",
                            step.status === "error" && "bg-destructive/10 border-destructive/20",
                            "hover:bg-accent/50 cursor-default"
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
                            
                            <div className="flex items-center gap-2">
                              {step.duration && (
                                <span className="text-xs text-muted-foreground">
                                  {step.duration}s
                                </span>
                              )}
                              {step.message && (
                                <Info className="h-3 w-3 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      {step.message && (
                        <TooltipContent side="right">
                          <p className="max-w-xs">{step.message}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskExecutionProgress;


import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from "@/lib/types";
import useTaskExecution from "@/hooks/use-task-execution";
import { Button } from "@/components/ui/button";
import { Loader2, Terminal, AlertTriangle, RefreshCw } from "lucide-react";
import { PlatformError } from "@/lib/error-handling";
import TaskExecutionProgress from "./TaskExecutionProgress";

interface TaskExecutionMonitorProps {
  task: Task;
  onClose: () => void;
}

const TaskExecutionMonitor: React.FC<TaskExecutionMonitorProps> = ({ task, onClose }) => {
  const { 
    isRunning, 
    progress, 
    currentStepDescription, 
    logs, 
    lastError,
    canRetry,
    retryTask
  } = useTaskExecution(task.id);

  // Track execution steps
  const [executionSteps, setExecutionSteps] = useState<Array<{
    name: string;
    status: "pending" | "in-progress" | "completed" | "error";
    duration?: number;
    message?: string;
  }>>([]);
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Parse logs to track step progress
  useEffect(() => {
    if (logs.length === 0) return;
    
    const stepRegex = /Step(?:\s+(\d+)\/(\d+))?:?\s+(.+?)(?:\s+\((\d+)%.*\))?$/;
    const steps: Record<string, {
      name: string;
      status: "pending" | "in-progress" | "completed" | "error";
      index?: number;
      totalSteps?: number;
      progress?: number;
      duration?: number;
      message?: string;
    }> = {};
    
    let currentActive = 0;
    
    // Process logs to extract step information
    logs.forEach((log, i) => {
      const match = log.match(stepRegex);
      if (match) {
        const [_, stepNumStr, totalStepsStr, stepName, progressStr] = match;
        
        const stepIndex = stepNumStr ? parseInt(stepNumStr, 10) - 1 : Object.keys(steps).length;
        const progress = progressStr ? parseInt(progressStr, 10) : undefined;
        
        steps[stepName] = {
          name: stepName,
          status: "completed",
          index: stepIndex,
          totalSteps: totalStepsStr ? parseInt(totalStepsStr, 10) : undefined,
          progress
        };
        
        // If this log is from the last 3 entries, consider it active
        if (i >= logs.length - 3) {
          currentActive = stepIndex;
          steps[stepName].status = "in-progress";
        }
      }
      
      // Check for error logs
      if (log.toLowerCase().includes("error")) {
        // Find which step had the error
        Object.values(steps).forEach(step => {
          if (step.status === "in-progress") {
            step.status = "error";
            step.message = log;
          }
        });
      }
    });
    
    // Convert to array and sort by index
    const stepsArray = Object.values(steps)
      .sort((a, b) => (a.index || 0) - (b.index || 0))
      .map(step => ({
        name: step.name,
        status: step.status,
        duration: step.duration,
        message: step.message
      }));
    
    if (stepsArray.length > 0) {
      setExecutionSteps(stepsArray);
      setCurrentStepIndex(currentActive);
    }
  }, [logs]);

  // Determine if we should show error details
  const showErrorDetails = !!lastError && !isRunning;

  return (
    <Card className="w-full max-w-3xl bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            {isRunning && <Loader2 className="h-4 w-4 animate-spin" />}
            {task.name}
          </CardTitle>
          <Button variant="ghost" onClick={onClose} size="sm">Close</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
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
          />
        )}
        
        {/* Error details section */}
        {showErrorDetails && (
          <div className="bg-destructive/10 border border-destructive/30 p-3 rounded-md space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <p className="text-sm font-medium text-destructive">Error Details</p>
            </div>
            <p className="text-sm">{lastError.getUserFriendlyMessage()}</p>
            {lastError.recoverable && (
              <p className="text-sm text-muted-foreground">{lastError.getRecoverySuggestion()}</p>
            )}
            {canRetry && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => retryTask(task.id)}
                className="mt-2 gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Retry Task
              </Button>
            )}
          </div>
        )}
        
        <div>
          <div className="flex items-center gap-1 mb-2">
            <Terminal className="h-4 w-4" />
            <p className="text-sm font-medium">Execution Log</p>
          </div>
          <ScrollArea className="h-48 bg-background/50 rounded-md p-2">
            <div className="font-mono text-xs space-y-1">
              {logs.length === 0 ? (
                <p className="text-muted-foreground italic">No logs yet</p>
              ) : (
                logs.map((log, i) => (
                  <div 
                    key={i} 
                    className={`border-b border-border/25 pb-1 ${log.includes("Error") ? "text-destructive" : ""}`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskExecutionMonitor;

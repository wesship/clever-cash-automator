
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from "@/lib/types";
import useTaskExecution from "@/hooks/use-task-execution";
import { Button } from "@/components/ui/button";
import { Loader2, Terminal, AlertTriangle, RefreshCw, Play, Pause, XCircle, CheckCircle, Clock } from "lucide-react";
import { PlatformError } from "@/lib/error-handling";
import TaskExecutionProgress from "./TaskExecutionProgress";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
    retryTask,
    stopTask,
    startTask
  } = useTaskExecution(task.id);

  const [activeTab, setActiveTab] = useState<string>("progress");
  const [executionTime, setExecutionTime] = useState<number>(0);

  // Track execution steps
  const [executionSteps, setExecutionSteps] = useState<Array<{
    name: string;
    status: "pending" | "in-progress" | "completed" | "error";
    duration?: number;
    message?: string;
  }>>([]);
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Start a timer to track execution time
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        setExecutionTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  // Format execution time as mm:ss
  const formatExecutionTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

  // Determine task status
  const getTaskStatusInfo = () => {
    if (isRunning) {
      return { 
        label: "Running", 
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
      };
    } else if (lastError) {
      return { 
        label: "Failed", 
        icon: <XCircle className="h-4 w-4" />,
        color: "bg-destructive/10 text-destructive border-destructive/20"
      };
    } else if (progress >= 100) {
      return { 
        label: "Completed", 
        icon: <CheckCircle className="h-4 w-4" />,
        color: "bg-green-500/10 text-green-500 border-green-500/20" 
      };
    } else if (progress > 0) {
      return { 
        label: "Paused", 
        icon: <Pause className="h-4 w-4" />,
        color: "bg-amber-500/10 text-amber-500 border-amber-500/20"
      };
    }
    return { 
      label: "Pending", 
      icon: <Clock className="h-4 w-4" />,
      color: "bg-muted text-muted-foreground border-muted-foreground/20"
    };
  };

  const statusInfo = getTaskStatusInfo();

  // Handle task control
  const handleTaskControl = () => {
    if (isRunning) {
      stopTask(task.id);
      toast.info(`Paused task: ${task.name}`);
    } else {
      if (lastError && canRetry) {
        retryTask(task.id);
        toast.info(`Retrying task: ${task.name}`);
      } else if (!lastError) {
        startTask(task);
        toast.success(`Started task: ${task.name}`);
      }
    }
  };

  // Determine if we should show error details
  const showErrorDetails = !!lastError && !isRunning;

  return (
    <Card className="w-full max-w-3xl bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center gap-2">
            {task.name}
            <Badge className={cn("ml-2 text-xs", statusInfo.color)}>
              <span className="flex items-center gap-1">
                {statusInfo.icon}
                {statusInfo.label}
              </span>
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {task.platform} • {task.type} • 
            {isRunning && (
              <span className="ml-1 text-blue-500">{formatExecutionTime(executionTime)} elapsed</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isRunning ? "outline" : "default"}
            onClick={handleTaskControl}
            disabled={!isRunning && lastError && !canRetry}
            size="sm"
            className="gap-1"
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : lastError && canRetry ? (
              <>
                <RefreshCw className="h-4 w-4" />
                Retry
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                {progress > 0 ? "Resume" : "Start"}
              </>
            )}
          </Button>
          <Button variant="ghost" onClick={onClose} size="sm">Close</Button>
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pb-1 border-b">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            {showErrorDetails && (
              <TabsTrigger value="errors" className="text-destructive">
                Errors
              </TabsTrigger>
            )}
            {!showErrorDetails && (
              <TabsTrigger value="details">Details</TabsTrigger>
            )}
          </TabsList>
        </div>

        <CardContent className="space-y-4 pt-6">
          <TabsContent value="progress" className="mt-0 space-y-4">
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
          </TabsContent>

          <TabsContent value="logs" className="mt-0">
            <div>
              <div className="flex items-center gap-1 mb-2">
                <Terminal className="h-4 w-4" />
                <p className="text-sm font-medium">Execution Log</p>
              </div>
              <ScrollArea className="h-64 bg-background/50 rounded-md p-2">
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
          </TabsContent>

          <TabsContent value="errors" className="mt-0">
            {showErrorDetails && (
              <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-md space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <p className="font-medium text-destructive">Error Details</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Message</h3>
                  <p className="text-sm bg-background/50 p-3 rounded-md">
                    {lastError.getUserFriendlyMessage()}
                  </p>
                </div>
                {lastError.recoverable && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Recovery Suggestion</h3>
                    <p className="text-sm bg-background/50 p-3 rounded-md">
                      {lastError.getRecoverySuggestion()}
                    </p>
                  </div>
                )}
                <div className="pt-2">
                  {canRetry && (
                    <Button 
                      variant="outline" 
                      onClick={() => retryTask(task.id)}
                      className="gap-1"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Retry Task
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="details" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Task ID</p>
                  <p className="text-sm font-mono">{task.id}</p>
                </div>
                <div className="bg-background/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Platform</p>
                  <p className="text-sm">{task.platform}</p>
                </div>
                <div className="bg-background/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm">{task.type}</p>
                </div>
                <div className="bg-background/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm">{task.createdAt?.toLocaleString() || 'Unknown'}</p>
                </div>
              </div>
              
              {task.description && (
                <div className="bg-background/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="text-sm">{task.description}</p>
                </div>
              )}
              
              <div className="bg-background/50 p-3 rounded-md">
                <p className="text-xs text-muted-foreground mb-1">Configuration</p>
                <ScrollArea className="h-32">
                  <pre className="text-xs whitespace-pre-wrap">
                    {JSON.stringify(task.config, null, 2)}
                  </pre>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default TaskExecutionMonitor;

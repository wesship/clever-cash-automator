
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/lib/types";
import useTaskExecution from "@/hooks/use-task-execution";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlatformError } from "@/lib/error-handling";
import { parseStepsFromLogs } from "./TaskExecution/utils";

// Import our new components
import TaskStatusBadge from "./TaskExecution/TaskStatusBadge";
import TaskControlButtons from "./TaskExecution/TaskControlButtons";
import TaskProgressTab from "./TaskExecution/TaskProgressTab";
import TaskLogsTab from "./TaskExecution/TaskLogsTab";
import TaskErrorsTab from "./TaskExecution/TaskErrorsTab";
import TaskDetailsTab from "./TaskExecution/TaskDetailsTab";

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

  // Use parseStepsFromLogs utility
  const { steps: executionSteps, currentStepIndex } = parseStepsFromLogs(logs);

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

  // Determine if we should show error details
  const showErrorDetails = !!lastError && !isRunning;

  return (
    <Card className="w-full max-w-3xl bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center gap-2">
            {task.name}
            <TaskStatusBadge 
              isRunning={isRunning} 
              lastError={lastError}
              progress={progress} 
            />
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {task.platform} • {task.type} • 
            {isRunning && (
              <span className="ml-1 text-blue-500">{executionTime}s elapsed</span>
            )}
          </p>
        </div>
        <TaskControlButtons 
          isRunning={isRunning}
          lastError={lastError}
          canRetry={canRetry}
          taskId={task.id}
          taskName={task.name}
          onStartTask={startTask}
          onStopTask={stopTask}
          onRetryTask={retryTask}
          onClose={onClose}
          progress={progress}
          task={task} // Pass the task object
        />
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
            <TaskProgressTab 
              progress={progress}
              currentStepDescription={currentStepDescription}
              executionSteps={executionSteps}
              currentStepIndex={currentStepIndex}
              isRunning={isRunning}
              executionTime={executionTime}
            />
          </TabsContent>

          <TabsContent value="logs" className="mt-0">
            <TaskLogsTab logs={logs} />
          </TabsContent>

          <TabsContent value="errors" className="mt-0">
            {showErrorDetails && lastError && (
              <TaskErrorsTab 
                lastError={lastError as PlatformError}
                canRetry={canRetry}
                onRetryTask={retryTask}
                taskId={task.id}
              />
            )}
          </TabsContent>

          <TabsContent value="details" className="mt-0">
            <TaskDetailsTab task={task} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default TaskExecutionMonitor;

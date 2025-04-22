
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, XCircle, Copy, RotateCcw } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Background3D from "@/components/ui/3d-background";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Task } from "@/lib/types";
import TaskExecutionMonitor from "@/components/Dashboard/TaskExecutionMonitor";
import { MockTaskProvider } from "@/services/task-execution/mock-task-provider";
import { TaskExecutionEngine } from "@/services/task-execution";
import useTaskExecution from "@/hooks/use-task-execution";
import TaskPerformanceMonitor from "@/components/Dashboard/TaskPerformanceMonitor";
import useEnhancedLogging from "@/hooks/use-enhanced-logging";
import { EnhancedErrorHandler } from "@/lib/error-handling/enhanced-error-handler";

// Import components
import TaskDetailHeader from "@/components/TaskDetail/TaskDetailHeader";
import TaskDetailCard from "@/components/TaskDetail/TaskDetailCard";
import TaskDetailTabs from "@/components/TaskDetail/TaskDetailTabs";
import TaskOverviewTab from "@/components/TaskDetail/tabs/TaskOverviewTab";
import TaskConfigurationTab from "@/components/TaskDetail/tabs/TaskConfigurationTab";
import TaskDetailLoading from "@/components/TaskDetail/TaskDetailLoading";
import TaskTemplateDialog from "@/components/TaskDetail/TaskTemplateDialog";
import TaskProgressIndicator from "@/components/TaskDetail/TaskProgressIndicator";

const EnhancedTaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  
  // Use enhanced logging for this task
  const logger = useEnhancedLogging({
    namespace: id ? `task:${id}` : undefined,
    captureConsole: true
  });
  
  // Use the task execution hook
  const {
    isRunning,
    progress,
    startTask,
    stopTask,
    retryTask,
    cancelTask,
  } = useTaskExecution(id);

  useEffect(() => {
    if (!id) return;
    
    logger.info("Loading task details", { taskId: id });
    
    try {
      // Fetch task details
      const fetchedTask = MockTaskProvider.getTaskFromId(id);
      if (fetchedTask) {
        setTask(fetchedTask);
        logger.info("Task details loaded successfully", { 
          taskId: id,
          taskName: fetchedTask.name,
          taskStatus: fetchedTask.status
        });
      } else {
        logger.error("Task not found", { taskId: id });
        toast.error("Task not found");
        navigate("/");
      }
    } catch (error) {
      // Use enhanced error handling
      EnhancedErrorHandler.handleError(error instanceof Error ? error : new Error("Unknown error"), {
        taskId: id,
        displayToUser: true,
        logToServer: true,
        context: { action: "loadTaskDetails" }
      });
      
      navigate("/");
    }
  }, [id, navigate, logger]);

  const handleStartTask = () => {
    if (!task) return;
    
    logger.info("Starting task", { taskId: id, taskName: task.name });
    
    try {
      startTask(task);
      toast.success(`Task "${task.name}" started successfully`);
    } catch (error) {
      EnhancedErrorHandler.handleError(error instanceof Error ? error : new Error("Failed to start task"), {
        taskId: id,
        displayToUser: true,
        context: { action: "startTask" }
      });
    }
  };

  const handleStopTask = () => {
    if (!id || !task) return;
    
    logger.info("Stopping task", { taskId: id, taskName: task.name });
    
    try {
      stopTask(id);
      toast.success(`Task "${task.name}" paused successfully`);
    } catch (error) {
      EnhancedErrorHandler.handleError(error instanceof Error ? error : new Error("Failed to stop task"), {
        taskId: id,
        displayToUser: true,
        context: { action: "stopTask" }
      });
    }
  };
  
  const handleCancelTask = () => {
    if (!id || !task) return;
    
    logger.info("Cancelling task", { taskId: id, taskName: task.name });
    
    try {
      cancelTask(id);
      toast.success(`Task "${task.name}" cancelled successfully`);
    } catch (error) {
      EnhancedErrorHandler.handleError(error instanceof Error ? error : new Error("Failed to cancel task"), {
        taskId: id,
        displayToUser: true,
        context: { action: "cancelTask" }
      });
    }
  };
  
  const handleRetryTask = () => {
    if (!id || !task) return;
    
    logger.info("Retrying task", { taskId: id, taskName: task.name });
    
    try {
      retryTask(id);
      toast.success(`Retrying task "${task.name}"`);
    } catch (error) {
      EnhancedErrorHandler.handleError(error instanceof Error ? error : new Error("Failed to retry task"), {
        taskId: id,
        displayToUser: true,
        context: { action: "retryTask" }
      });
    }
  };
  
  const handleSaveAsTemplate = () => {
    if (!task) return;
    
    logger.info("Saving task as template", { taskId: id, taskName: task.name });
    
    try {
      // In a real app we would save the task as a template
      toast.success(`Saved "${task.name}" as template`);
      setTemplateDialogOpen(false);
    } catch (error) {
      EnhancedErrorHandler.handleError(error instanceof Error ? error : new Error("Failed to save template"), {
        taskId: id,
        displayToUser: true,
        context: { action: "saveAsTemplate" }
      });
    }
  };
  
  const handleCopyToClipboard = () => {
    if (!task) return;
    
    logger.info("Copying task configuration to clipboard", { taskId: id });
    
    try {
      navigator.clipboard.writeText(JSON.stringify(task, null, 2));
      toast.success("Task configuration copied to clipboard");
    } catch (error) {
      EnhancedErrorHandler.handleError(error instanceof Error ? error : new Error("Failed to copy to clipboard"), {
        taskId: id,
        displayToUser: true,
        context: { action: "copyToClipboard" }
      });
    }
  };
  
  const handleExportLogs = () => {
    if (!id) return;
    
    try {
      const logs = logger.exportLogs();
      
      // Create a download link
      const blob = new Blob([logs], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `task-${id}-logs.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Logs exported successfully");
    } catch (error) {
      EnhancedErrorHandler.handleError(error instanceof Error ? error : new Error("Failed to export logs"), {
        taskId: id,
        displayToUser: true,
        context: { action: "exportLogs" }
      });
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Background3D />
        <Header />
        <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <TaskDetailLoading />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const taskProgress = (task.completionCount / task.targetCompletions) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <TaskDetailHeader 
            task={task}
            isRunning={isRunning}
            handleStartTask={handleStartTask}
            handleStopTask={handleStopTask}
            handleRetryTask={handleRetryTask}
            handleCancelTask={handleCancelTask}
            setTemplateDialogOpen={setTemplateDialogOpen}
          />
          
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50 mb-6">
            <TaskDetailCard 
              task={task} 
              handleCopyToClipboard={handleCopyToClipboard} 
            />
            
            {/* Show progress indicator at the top of the card */}
            <div className="px-6 pb-4">
              <TaskProgressIndicator 
                status={task.status}
                progress={isRunning ? progress : taskProgress}
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TaskDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />
              
              <CardContent className="pt-6">
                <TabsContent value="overview" className="mt-0 space-y-4">
                  <TaskOverviewTab task={task} />
                  
                  {/* Add the new performance monitor component */}
                  <TaskPerformanceMonitor 
                    task={task}
                    onRetry={handleRetryTask}
                    onPause={handleStopTask}
                    onResume={handleStartTask}
                  />
                </TabsContent>
                
                <TabsContent value="execution" className="mt-0">
                  <TaskExecutionMonitor 
                    task={task} 
                    onClose={() => {}}
                  />
                  
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleExportLogs}
                    >
                      Export Task Logs
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="configuration" className="mt-0">
                  <TaskConfigurationTab task={task} />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
          
          <TaskTemplateDialog 
            open={templateDialogOpen}
            setOpen={setTemplateDialogOpen}
            onSaveTemplate={handleSaveAsTemplate}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EnhancedTaskDetail;

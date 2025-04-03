
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
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

// Import new components
import TaskDetailHeader from "@/components/TaskDetail/TaskDetailHeader";
import TaskDetailCard from "@/components/TaskDetail/TaskDetailCard";
import TaskDetailTabs from "@/components/TaskDetail/TaskDetailTabs";
import TaskOverviewTab from "@/components/TaskDetail/tabs/TaskOverviewTab";
import TaskConfigurationTab from "@/components/TaskDetail/tabs/TaskConfigurationTab";
import TaskDetailLoading from "@/components/TaskDetail/TaskDetailLoading";
import TaskTemplateDialog from "@/components/TaskDetail/TaskTemplateDialog";

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    // Fetch task details
    const fetchedTask = MockTaskProvider.getTaskFromId(id);
    if (fetchedTask) {
      setTask(fetchedTask);
      
      // Check if task is currently running
      setIsRunning(TaskExecutionEngine.isTaskRunning(id));
    } else {
      toast.error("Task not found");
      navigate("/");
    }
    
    // Setup interval to check if task is running
    const interval = setInterval(() => {
      if (!id) return;
      setIsRunning(TaskExecutionEngine.isTaskRunning(id));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [id, navigate]);

  const handleStartTask = () => {
    if (!task) return;
    
    TaskExecutionEngine.startTask(task);
    setIsRunning(true);
    toast.success(`Started task: ${task.name}`);
  };

  const handleStopTask = () => {
    if (!id) return;
    
    TaskExecutionEngine.stopTask(id);
    setIsRunning(false);
    toast.info("Task paused");
  };
  
  const handleCancelTask = () => {
    if (!id) return;
    
    TaskExecutionEngine.stopTask(id);
    setIsRunning(false);
    toast.info("Task cancelled");
  };
  
  const handleRetryTask = () => {
    if (!id || !task) return;
    
    TaskExecutionEngine.retryTask(id);
    setIsRunning(true);
    toast.success(`Retrying task: ${task.name}`);
  };
  
  const handleSaveAsTemplate = () => {
    if (!task) return;
    
    // In a real app we would save the task as a template
    toast.success(`Saved "${task.name}" as template`);
    setTemplateDialogOpen(false);
  };
  
  const handleCopyToClipboard = () => {
    if (!task) return;
    
    navigator.clipboard.writeText(JSON.stringify(task, null, 2));
    toast.success("Task configuration copied to clipboard");
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
          
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <TaskDetailCard 
              task={task} 
              handleCopyToClipboard={handleCopyToClipboard} 
            />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TaskDetailTabs activeTab={activeTab} />
              
              <CardContent className="pt-6">
                <TabsContent value="overview" className="mt-0 space-y-4">
                  <TaskOverviewTab task={task} />
                </TabsContent>
                
                <TabsContent value="execution" className="mt-0">
                  <TaskExecutionMonitor 
                    task={task} 
                    onClose={() => {}}
                  />
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

export default TaskDetail;

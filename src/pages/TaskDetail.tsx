
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Play, Pause, XCircle, Copy, RotateCcw, Tag as TagIcon } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Background3D from "@/components/ui/3d-background";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task, TaskStatus } from "@/lib/types";
import TaskExecutionMonitor from "@/components/Dashboard/TaskExecutionMonitor";
import { MockTaskProvider } from "@/services/task-execution/mock-task-provider";
import { TaskExecutionEngine } from "@/services/task-execution";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
    // Here we would set the task status to cancelled if we had that status
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
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="flex items-center justify-center py-12">
                <p>Loading task details...</p>
              </CardContent>
            </Card>
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
          <div className="mb-6 flex items-center justify-between">
            <Button 
              variant="outline"
              className="gap-1"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="flex items-center gap-2">
              {isRunning ? (
                <Button 
                  variant="outline"
                  onClick={handleStopTask}
                  className="gap-1"
                >
                  <Pause className="h-4 w-4" />
                  Pause Task
                </Button>
              ) : (
                <>
                  {task.status === TaskStatus.FAILED ? (
                    <Button 
                      variant="outline"
                      onClick={handleRetryTask}
                      className="gap-1"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Retry Task
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      onClick={handleStartTask}
                      className="gap-1"
                      disabled={task.status === TaskStatus.COMPLETED}
                    >
                      <Play className="h-4 w-4" />
                      {task.status === TaskStatus.PAUSED ? "Resume Task" : "Start Task"}
                    </Button>
                  )}
                  
                  {task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.FAILED && (
                    <Button 
                      variant="outline"
                      onClick={handleCancelTask}
                      className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel Task
                    </Button>
                  )}
                </>
              )}
              
              <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary">Save as Template</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save Task as Template</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      This will save the current task configuration as a template that you can reuse later.
                    </p>
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between gap-2">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setTemplateDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="w-full" 
                          onClick={handleSaveAsTemplate}
                        >
                          Save Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {task.name}
                    <Badge 
                      className={cn(
                        task.status === TaskStatus.RUNNING && "bg-blue-500/10 text-blue-500",
                        task.status === TaskStatus.COMPLETED && "bg-green-500/10 text-green-500",
                        task.status === TaskStatus.FAILED && "bg-destructive/10 text-destructive",
                        task.status === TaskStatus.PAUSED && "bg-amber-500/10 text-amber-500",
                        task.status === TaskStatus.PENDING && "bg-muted text-muted-foreground"
                      )}
                    >
                      {task.status}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleCopyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy Configuration</span>
                </Button>
              </div>
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-6 pb-1 border-b">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="execution">Execution</TabsTrigger>
                  <TabsTrigger value="configuration">Configuration</TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent className="pt-6">
                <TabsContent value="overview" className="mt-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium">Task Details</h3>
                        <div className="mt-2 grid grid-cols-2 gap-3">
                          <div className="bg-background/50 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">Platform</p>
                            <p className="text-sm font-medium">{task.platform}</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">Type</p>
                            <p className="text-sm font-medium">{task.type}</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">Created</p>
                            <p className="text-sm font-medium">{format(task.createdAt, 'MMM d, yyyy')}</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">Last Run</p>
                            <p className="text-sm font-medium">
                              {task.lastRun ? format(task.lastRun, 'MMM d, yyyy HH:mm') : 'Never'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Task Tags Section */}
                      <div>
                        <h3 className="text-sm font-medium">Tags</h3>
                        <div className="mt-2 bg-background/50 p-3 rounded-md">
                          {task.config.taskTags && task.config.taskTags.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {task.config.taskTags.map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="flex items-center gap-1">
                                  <TagIcon className="h-3 w-3" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No tags assigned</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Task Dependencies Section */}
                      {task.config.dependencies && (
                        <div>
                          <h3 className="text-sm font-medium">Dependencies</h3>
                          <div className="mt-2 bg-background/50 p-3 rounded-md">
                            {task.config.dependencies.length > 0 ? (
                              <ul className="space-y-2">
                                {task.config.dependencies.map((dep, idx) => (
                                  <li key={idx} className="text-sm">
                                    {dep.taskId} - {dep.condition}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground">No dependencies</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium">Performance</h3>
                        <div className="mt-2 grid grid-cols-2 gap-3">
                          <div className="bg-background/50 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">Completions</p>
                            <p className="text-sm font-medium">
                              {task.completionCount}/{task.targetCompletions}
                            </p>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                              <div 
                                className="h-full bg-blue-500" 
                                style={{ 
                                  width: `${(task.completionCount / task.targetCompletions) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="bg-background/50 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">Earnings</p>
                            <p className="text-sm font-medium text-green-500">${task.earnings.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium">Schedule</h3>
                        <div className="mt-2 bg-background/50 p-3 rounded-md">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Frequency</p>
                              <p className="text-sm font-medium capitalize">
                                {task.config.schedule?.frequency || "Not scheduled"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Max Runs</p>
                              <p className="text-sm font-medium">
                                {task.config.schedule?.maxRuns || "Unlimited"}
                              </p>
                            </div>
                            {task.config.schedule?.timeOfDay && (
                              <div className="col-span-2">
                                <p className="text-xs text-muted-foreground">Time of Day</p>
                                <p className="text-sm font-medium">
                                  {task.config.schedule.timeOfDay}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {task.status === TaskStatus.FAILED && (
                        <div>
                          <h3 className="text-sm font-medium text-destructive">Last Error</h3>
                          <div className="mt-2 bg-destructive/10 border border-destructive/30 p-3 rounded-md">
                            <p className="text-sm">
                              {TaskExecutionEngine.getLastError(task.id)?.getUserFriendlyMessage() || 
                                "Unknown error occurred"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="execution" className="mt-0">
                  <TaskExecutionMonitor 
                    task={task} 
                    onClose={() => {}}
                  />
                </TabsContent>
                
                <TabsContent value="configuration" className="mt-0">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-6 pr-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Basic Configuration</h3>
                        <div className="bg-background/50 p-4 rounded-md">
                          <pre className="text-xs whitespace-pre-wrap">
                            {JSON.stringify({
                              id: task.id,
                              name: task.name,
                              type: task.type,
                              platform: task.platform,
                              description: task.description
                            }, null, 2)}
                          </pre>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Advanced Configuration</h3>
                        <div className="bg-background/50 p-4 rounded-md">
                          <pre className="text-xs whitespace-pre-wrap">
                            {JSON.stringify(task.config, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TaskDetail;

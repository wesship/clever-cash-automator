
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task, TaskStatus } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, RotateCcw, Trash2, TagIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TaskStatusBadge } from "./TaskStatusBadge";

interface TaskHistoryPanelProps {
  tasks: Task[];
  onViewTask?: (taskId: string) => void;
  onRetryTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
}

const TaskHistoryPanel: React.FC<TaskHistoryPanelProps> = ({
  tasks,
  onViewTask,
  onRetryTask,
  onDeleteTask,
}) => {
  const [filter, setFilter] = useState<"all" | "completed" | "failed">("all");
  const navigate = useNavigate();
  
  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.status === TaskStatus.COMPLETED;
    if (filter === "failed") return task.status === TaskStatus.FAILED;
    return task.status === TaskStatus.COMPLETED || task.status === TaskStatus.FAILED;
  });

  const handleViewDetails = (taskId: string) => {
    if (onViewTask) {
      onViewTask(taskId);
    } else {
      navigate(`/task/${taskId}`);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Task History</span>
          <Tabs defaultValue="all" value={filter} onValueChange={(v) => setFilter(v as any)}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[200px] text-center">
              <p className="text-muted-foreground">No task history found</p>
              <p className="text-sm text-muted-foreground">Completed and failed tasks will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="p-3 bg-background/80 rounded-md border border-border/30 hover:border-border/60 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{task.name}</h3>
                        <TaskStatusBadge status={task.status} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {task.lastRun ? (
                          <>Ran {formatDistanceToNow(task.lastRun, { addSuffix: true })}</>
                        ) : (
                          <>Never ran</>
                        )}
                      </p>
                      {task.config.taskTags && task.config.taskTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {task.config.taskTags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs py-0">
                              <TagIcon className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewDetails(task.id)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Button>
                      {task.status === TaskStatus.FAILED && onRetryTask && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600"
                          onClick={() => onRetryTask(task.id)}
                        >
                          <RotateCcw className="h-4 w-4" />
                          <span className="sr-only">Retry</span>
                        </Button>
                      )}
                      {onDeleteTask && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive/80"
                          onClick={() => onDeleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TaskHistoryPanel;

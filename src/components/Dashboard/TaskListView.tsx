
import React from "react";
import { Task } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Pause, Trash2, Edit, Eye } from "lucide-react";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskProgress from "./TaskProgress";
import { useNavigate } from "react-router-dom";

interface TaskListViewProps {
  tasks: Task[];
  onStartTask?: (taskId: string) => void;
  onPauseTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
  onEditTask?: (taskId: string) => void;
  isInView?: boolean;
  bulkMode?: boolean;
  selectedTaskIds?: string[];
  onTaskSelect?: (taskId: string) => void;
}

const TaskListView: React.FC<TaskListViewProps> = ({
  tasks,
  onStartTask,
  onPauseTask,
  onDeleteTask,
  onEditTask,
  isInView = true,
  bulkMode = false,
  selectedTaskIds = [],
  onTaskSelect
}) => {
  const navigate = useNavigate();
  
  const handleViewDetails = (taskId: string) => {
    navigate(`/task/${taskId}`);
  };
  
  return (
    <div className="mt-6 space-y-3">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="group flex items-center justify-between bg-card/60 backdrop-blur-sm p-4 rounded-lg border border-border/40 hover:border-border/70 transition-colors animate-fade-in"
        >
          <div className="flex items-center space-x-4 flex-1">
            {bulkMode && onTaskSelect && (
              <Checkbox 
                checked={selectedTaskIds.includes(task.id)} 
                onCheckedChange={() => onTaskSelect(task.id)}
                className="border-border"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="font-medium">{task.name}</h3>
                <TaskStatusBadge status={task.status} className="ml-2" />
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-muted-foreground">
                  {task.platform} • {task.type.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-muted-foreground">
                  Created {formatDistanceToNow(task.createdAt, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              <div className="w-32">
                <TaskProgress 
                  current={task.completionCount} 
                  total={task.targetCompletions} 
                />
              </div>
              <div className="text-vibrant-green font-medium w-20 text-right">
                ${task.earnings.toFixed(2)}
              </div>
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
              {onStartTask && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onStartTask(task.id)}
                >
                  <Play className="h-4 w-4" />
                  <span className="sr-only">Start Task</span>
                </Button>
              )}
              {onPauseTask && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onPauseTask(task.id)}
                >
                  <Pause className="h-4 w-4" />
                  <span className="sr-only">Pause Task</span>
                </Button>
              )}
              {onEditTask && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onEditTask(task.id)}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Task</span>
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
                  <span className="sr-only">Delete Task</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskListView;

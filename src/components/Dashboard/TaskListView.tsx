
import React from "react";
import { Task, TaskStatus } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash, Edit2 } from "lucide-react";
import TaskProgress from "./TaskProgress";
import { Badge } from "@/components/ui/badge";

interface TaskListViewProps {
  tasks: Task[];
  onStartTask?: (taskId: string) => void;
  onPauseTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
  onEditTask?: (taskId: string) => void;
  onViewTaskDetails?: (taskId: string) => void;
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
  onViewTaskDetails,
  bulkMode = false,
  selectedTaskIds = [],
  onTaskSelect
}) => {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.RUNNING:
        return "text-vibrant-green";
      case TaskStatus.PAUSED:
        return "text-muted-foreground";
      case TaskStatus.COMPLETED:
        return "text-vibrant-blue";
      case TaskStatus.FAILED:
        return "text-destructive";
      default:
        return "text-vibrant-yellow";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-4">
        <thead className="text-left bg-background-light">
          <tr className="border-b border-border">
            {bulkMode && onTaskSelect && (
              <th className="py-2 px-4 font-medium text-muted-foreground">
                <Checkbox 
                  checked={false}
                  onCheckedChange={() => {}}
                  className="bg-background border-border h-4 w-4"
                />
              </th>
            )}
            <th className="py-2 px-4 font-medium text-muted-foreground">Name</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Status</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Progress</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Platform</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Earnings</th>
            <th className="py-2 px-4 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b border-border hover:bg-accent/10">
              {bulkMode && onTaskSelect && (
                <td className="py-2 px-4">
                  <Checkbox 
                    checked={selectedTaskIds.includes(task.id)} 
                    onCheckedChange={() => onTaskSelect(task.id)}
                    className="bg-background border-border h-4 w-4"
                  />
                </td>
              )}
              <td className="py-2 px-4 font-medium">
                <div 
                  className="cursor-pointer hover:text-primary"
                  onClick={() => onViewTaskDetails && onViewTaskDetails(task.id)}
                >
                  {task.name}
                </div>
              </td>
              <td className="py-2 px-4">
                <span className={`font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </td>
              <td className="py-2 px-4">
                <TaskProgress 
                  completionCount={task.completionCount}
                  targetCompletions={task.targetCompletions}
                  status={task.status}
                />
              </td>
              <td className="py-2 px-4">
                <Badge variant="outline" className="font-normal">
                  {task.platform}
                </Badge>
              </td>
              <td className="py-2 px-4 font-medium text-vibrant-green">
                ${task.earnings.toFixed(2)}
              </td>
              <td className="py-2 px-4">
                <div className="flex items-center gap-1">
                  {task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.FAILED && (
                    <>
                      {task.status === TaskStatus.PAUSED || task.status === TaskStatus.PENDING ? (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => onStartTask && onStartTask(task.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => onPauseTask && onPauseTask(task.id)}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                    </>
                  )}
                  {onEditTask && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => onEditTask(task.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                  {onDeleteTask && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onDeleteTask(task.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListView;

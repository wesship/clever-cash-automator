
import React, { useMemo } from "react";
import { Task } from "@/lib/types";
import TaskCard from "./TaskCard";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskCardProps {
  task: Task;
  delay?: number;
  isInView?: boolean;
  className?: string;
  onStart?: (taskId: string) => void;
  onPause?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string) => void;
}

interface TaskGridViewProps {
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

const TaskGridView = React.memo(({
  tasks,
  onStartTask,
  onPauseTask,
  onDeleteTask,
  onEditTask,
  isInView = true,
  bulkMode = false,
  selectedTaskIds = [],
  onTaskSelect
}: TaskGridViewProps) => {
  // Memoize the task cards grid layout
  const taskGrid = useMemo(() => (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task, index) => (
        <div key={task.id} className="relative">
          {bulkMode && onTaskSelect && (
            <div className="absolute top-2 left-2 z-10">
              <Checkbox 
                checked={selectedTaskIds.includes(task.id)} 
                onCheckedChange={() => onTaskSelect(task.id)}
                className="bg-background border-border h-5 w-5"
              />
            </div>
          )}
          <TaskCard
            task={task}
            onStart={onStartTask}
            onPause={onPauseTask}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
            delay={index * 100}
            isInView={isInView}
            className={bulkMode ? "pl-7" : ""}
          />
        </div>
      ))}
    </div>
  ), [tasks, onStartTask, onPauseTask, onDeleteTask, onEditTask, isInView, bulkMode, selectedTaskIds, onTaskSelect]);

  return taskGrid;
});

TaskGridView.displayName = 'TaskGridView';

export default TaskGridView;

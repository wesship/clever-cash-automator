
import React from "react";
import { Task } from "@/lib/types";
import TaskCard from "./TaskCard";
import { cn } from "@/lib/utils";

interface TaskGridViewProps {
  tasks: Task[];
  onStartTask: (taskId: string) => void;
  onPauseTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
  isInView: boolean;
}

export const TaskGridView: React.FC<TaskGridViewProps> = ({
  tasks,
  onStartTask,
  onPauseTask,
  onDeleteTask,
  onEditTask,
  isInView
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStart={onStartTask}
          onPause={onPauseTask}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
          className={cn("animate-fade-in", isInView ? "opacity-100" : "opacity-0")}
        />
      ))}
    </div>
  );
};

export default TaskGridView;


import React from "react";
import { Task } from "@/lib/types";
import TaskCard from "./TaskCard";
import ErrorBoundary from "@/components/ui/error-boundary";

interface TaskListProps {
  tasks: Task[];
  onViewTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = React.memo(({ tasks, onViewTask }) => {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-4">
        No tasks scheduled for this day
      </p>
    );
  }

  return (
    <ErrorBoundary>
      <div 
        className="space-y-4"
        role="list"
        aria-label="Scheduled tasks"
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onViewTask}
          />
        ))}
      </div>
    </ErrorBoundary>
  );
});

TaskList.displayName = "TaskList";

export default TaskList;

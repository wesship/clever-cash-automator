
import React from "react";
import { Task } from "@/lib/types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onViewTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onViewTask }) => {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-4">
        No tasks scheduled for this day
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onClick={onViewTask}
        />
      ))}
    </div>
  );
};

export default TaskList;


import React from "react";
import { Task } from "@/lib/types";
import TaskList from "@/components/Dashboard/TaskList";

interface TasksTabProps {
  tasks: Task[];
  onCreateTask: () => void;
}

const TasksTab: React.FC<TasksTabProps> = ({ tasks, onCreateTask }) => {
  return (
    <div className="animate-fade-in">
      <TaskList 
        tasks={tasks} 
        onCreateTask={onCreateTask} 
      />
    </div>
  );
};

export default TasksTab;

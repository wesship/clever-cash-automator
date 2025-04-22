
import React, { useMemo } from "react";
import { Task } from "@/lib/types";
import TaskGridView from "./TaskGridView";
import TaskListView from "./TaskListView";
import TaskEmptyState from "./TaskEmptyState";

interface TaskViewContainerProps {
  tasks: Task[];
  viewMode: "grid" | "list";
  isInView: boolean;
  bulkModeActive: boolean;
  selectedTaskIds: string[];
  selectTask: (taskId: string) => void;
  onStartTask: (taskId: string) => void;
  onPauseTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
  onViewTaskDetails?: (taskId: string) => void;
  onCreateTask?: () => void;
}

const TaskViewContainer = React.memo(({
  tasks,
  viewMode,
  isInView,
  bulkModeActive,
  selectedTaskIds,
  selectTask,
  onStartTask,
  onPauseTask,
  onDeleteTask,
  onEditTask,
  onViewTaskDetails,
  onCreateTask
}: TaskViewContainerProps) => {
  // Memoize the empty state component
  const emptyStateComponent = useMemo(() => (
    <TaskEmptyState onCreateTask={onCreateTask} />
  ), [onCreateTask]);

  if (tasks.length === 0) {
    return emptyStateComponent;
  }

  if (viewMode === 'grid') {
    return (
      <TaskGridView
        tasks={tasks}
        onStartTask={onStartTask}
        onPauseTask={onPauseTask}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
        isInView={isInView}
        bulkMode={bulkModeActive}
        selectedTaskIds={selectedTaskIds}
        onTaskSelect={selectTask}
      />
    );
  }
  
  return (
    <TaskListView
      tasks={tasks}
      onStartTask={onStartTask}
      onPauseTask={onPauseTask}
      onDeleteTask={onDeleteTask}
      onEditTask={onEditTask}
      onViewTaskDetails={onViewTaskDetails}
      isInView={isInView}
      bulkMode={bulkModeActive}
      selectedTaskIds={selectedTaskIds}
      onTaskSelect={selectTask}
    />
  );
});

TaskViewContainer.displayName = 'TaskViewContainer';

export default TaskViewContainer;

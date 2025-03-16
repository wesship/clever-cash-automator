
import React, { useState } from "react";
import { Task } from "@/lib/types";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import KeyboardShortcutsDialog from "@/components/ui/keyboard-shortcuts";
import useKeyboardShortcuts from "@/hooks/use-keyboard-shortcuts";
import useInView from "@/hooks/use-in-view";
import useTaskData from "@/hooks/use-task-data";
import TaskSearchFilters from "./TaskSearchFilters";
import TaskEmptyState from "./TaskEmptyState";
import TaskGridView from "./TaskGridView";
import TaskListView from "./TaskListView";

interface TaskListProps {
  tasks: Task[];
  onCreateTask?: () => void;
  className?: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onCreateTask,
  className
}) => {
  const { preferences, updatePreference } = useUserPreferences();
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = useState(false);
  
  const { helpVisible, setHelpVisible } = useKeyboardShortcuts({
    createTask: () => onCreateTask && onCreateTask(),
    toggleView: () => updatePreference('taskListView', preferences.taskListView === 'grid' ? 'list' : 'grid'),
    toggleHelp: () => setShortcutsDialogOpen(true)
  });

  const [containerRef, isInView] = useInView<HTMLDivElement>({
    triggerOnce: true,
    threshold: 0.1,
  });

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    sortBy,
    setSortBy,
    filteredTasks
  } = useTaskData(tasks);

  const handleStartTask = (taskId: string) => {
    toast.success("Task started successfully");
  };

  const handlePauseTask = (taskId: string) => {
    toast.success("Task paused successfully");
  };

  const handleDeleteTask = (taskId: string) => {
    toast.success("Task deleted successfully");
  };

  const handleEditTask = (taskId: string) => {
    console.log("Edit task", taskId);
  };

  const toggleView = () => {
    updatePreference('taskListView', preferences.taskListView === 'grid' ? 'list' : 'grid');
  };

  return (
    <div className={className} ref={containerRef}>
      <TaskSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        viewMode={preferences.taskListView}
        onViewModeChange={toggleView}
        onKeyboardShortcutsOpen={() => setShortcutsDialogOpen(true)}
        onCreateTask={onCreateTask}
      />

      {filteredTasks.length > 0 ? (
        preferences.taskListView === 'grid' ? (
          <TaskGridView
            tasks={filteredTasks}
            onStartTask={handleStartTask}
            onPauseTask={handlePauseTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            isInView={isInView}
          />
        ) : (
          <TaskListView
            tasks={filteredTasks}
            onStartTask={handleStartTask}
            onPauseTask={handlePauseTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            isInView={isInView}
          />
        )
      ) : (
        <TaskEmptyState onCreateTask={onCreateTask} />
      )}
      
      <KeyboardShortcutsDialog 
        open={shortcutsDialogOpen} 
        onOpenChange={setShortcutsDialogOpen} 
      />
    </div>
  );
};

export default TaskList;

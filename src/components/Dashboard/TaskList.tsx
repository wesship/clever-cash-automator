
import React, { useState } from "react";
import { Task } from "@/lib/types";
import { toast } from "sonner";
import KeyboardShortcutsDialog from "@/components/ui/keyboard-shortcuts";
import useKeyboardShortcuts from "@/hooks/use-keyboard-shortcuts";
import useInView from "@/hooks/use-in-view";
import useTaskData from "@/hooks/use-task-data";
import TaskSearchFilters from "./TaskSearchFilters";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import useBulkTaskOperations from "@/hooks/use-bulk-task-operations";
import BulkOperationsBar from "./BulkOperationsBar";
import TaskViewContainer from "./TaskViewContainer";

interface TaskListProps {
  tasks: Task[];
  onCreateTask?: () => void;
  className?: string;
  onDeleteTasks?: (taskIds: string[]) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onCreateTask,
  className,
  onDeleteTasks
}) => {
  const { preferences, updatePreference } = useUserPreferences();
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = useState(false);
  const [bulkModeActive, setBulkModeActive] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  
  // Set up keyboard shortcuts
  const { helpVisible, setHelpVisible } = useKeyboardShortcuts({
    createTask: () => onCreateTask && onCreateTask(),
    toggleView: () => updatePreference('taskListView', preferences.taskListView === 'grid' ? 'list' : 'grid'),
    toggleHelp: () => setShortcutsDialogOpen(true)
  });

  // Set up in-view detection for animations
  const [containerRef, isInView] = useInView<HTMLDivElement>({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Set up task filtering and sorting
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
  
  // Set up bulk operations
  const {
    selectedTaskIds,
    selectTask,
    selectAllTasks,
    deselectAllTasks,
    startSelectedTasks,
    stopSelectedTasks,
    deleteSelectedTasks,
    isProcessing
  } = useBulkTaskOperations(filteredTasks);

  // Event handlers
  const handleStartTask = (taskId: string) => {
    if (bulkModeActive) {
      selectTask(taskId);
    } else {
      toast.success("Task started successfully");
    }
  };

  const handlePauseTask = (taskId: string) => {
    toast.success("Task paused successfully");
  };

  const handleDeleteTask = (taskId: string) => {
    if (onDeleteTasks) {
      onDeleteTasks([taskId]);
      toast.success("Task deleted successfully");
    }
  };

  const handleEditTask = (taskId: string) => {
    console.log("Edit task", taskId);
  };

  const handleDeleteSelected = () => {
    if (onDeleteTasks && selectedTaskIds.length > 0) {
      deleteSelectedTasks(onDeleteTasks);
      setConfirmDeleteOpen(false);
    }
  };

  const toggleView = () => {
    updatePreference('taskListView', preferences.taskListView === 'grid' ? 'list' : 'grid');
  };
  
  const toggleBulkMode = () => {
    if (bulkModeActive) {
      deselectAllTasks();
    }
    setBulkModeActive(!bulkModeActive);
  };

  return (
    <div className={className} ref={containerRef}>
      <div className="flex flex-col space-y-4">
        {/* Search and filters section */}
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
        
        {/* Bulk operations bar */}
        {filteredTasks.length > 0 && (
          <BulkOperationsBar
            bulkModeActive={bulkModeActive}
            toggleBulkMode={toggleBulkMode}
            selectedTaskIds={selectedTaskIds}
            selectAllTasks={selectAllTasks}
            deselectAllTasks={deselectAllTasks}
            startSelectedTasks={startSelectedTasks}
            stopSelectedTasks={stopSelectedTasks}
            handleDeleteSelected={handleDeleteSelected}
            isProcessing={isProcessing}
            confirmDeleteOpen={confirmDeleteOpen}
            setConfirmDeleteOpen={setConfirmDeleteOpen}
          />
        )}
      </div>

      {/* Task view (grid or list) */}
      <TaskViewContainer
        tasks={filteredTasks}
        viewMode={preferences.taskListView}
        isInView={isInView}
        bulkModeActive={bulkModeActive}
        selectedTaskIds={selectedTaskIds}
        selectTask={selectTask}
        onStartTask={handleStartTask}
        onPauseTask={handlePauseTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        onCreateTask={onCreateTask}
      />
      
      {/* Keyboard shortcuts dialog */}
      <KeyboardShortcutsDialog 
        open={shortcutsDialogOpen} 
        onOpenChange={setShortcutsDialogOpen} 
      />
    </div>
  );
};

export default TaskList;


import React, { useState } from "react";
import { Task } from "@/lib/types";
import { toast } from "sonner";
import { Plus, Play, Pause, Trash2, CheckSquare } from "lucide-react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import KeyboardShortcutsDialog from "@/components/ui/keyboard-shortcuts";
import useKeyboardShortcuts from "@/hooks/use-keyboard-shortcuts";
import useInView from "@/hooks/use-in-view";
import useTaskData from "@/hooks/use-task-data";
import TaskSearchFilters from "./TaskSearchFilters";
import TaskEmptyState from "./TaskEmptyState";
import TaskGridView from "./TaskGridView";
import TaskListView from "./TaskListView";
import { Button } from "@/components/ui/button";
import useBulkTaskOperations from "@/hooks/use-bulk-task-operations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
        
        {/* Bulk Operations Bar */}
        {filteredTasks.length > 0 && (
          <div className="flex items-center justify-between bg-muted/30 backdrop-blur-sm p-2 rounded-lg border border-border/40">
            <div className="flex items-center space-x-2">
              <Button
                variant={bulkModeActive ? "secondary" : "outline"}
                size="sm"
                onClick={toggleBulkMode}
                className="gap-1"
              >
                <CheckSquare className="h-4 w-4" />
                {bulkModeActive ? "Exit Bulk Mode" : "Bulk Operations"}
              </Button>
              
              {bulkModeActive && (
                <>
                  <span className="text-sm text-muted-foreground">
                    {selectedTaskIds.length} tasks selected
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={selectAllTasks}
                    disabled={isProcessing}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={deselectAllTasks}
                    disabled={isProcessing || selectedTaskIds.length === 0}
                  >
                    Deselect All
                  </Button>
                </>
              )}
            </div>
            
            {bulkModeActive && selectedTaskIds.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startSelectedTasks}
                  disabled={isProcessing}
                  className="gap-1"
                >
                  <Play className="h-4 w-4" />
                  Start
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stopSelectedTasks}
                  disabled={isProcessing}
                  className="gap-1"
                >
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
                <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isProcessing}
                      className="gap-1 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete {selectedTaskIds.length} tasks?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. These tasks will be permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteSelected}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        )}
      </div>

      {filteredTasks.length > 0 ? (
        preferences.taskListView === 'grid' ? (
          <TaskGridView
            tasks={filteredTasks}
            onStartTask={handleStartTask}
            onPauseTask={handlePauseTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            isInView={isInView}
            bulkMode={bulkModeActive}
            selectedTaskIds={selectedTaskIds}
            onTaskSelect={selectTask}
          />
        ) : (
          <TaskListView
            tasks={filteredTasks}
            onStartTask={handleStartTask}
            onPauseTask={handlePauseTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            isInView={isInView}
            bulkMode={bulkModeActive}
            selectedTaskIds={selectedTaskIds}
            onTaskSelect={selectTask}
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


import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash2, CheckSquare } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface BulkOperationsBarProps {
  bulkModeActive: boolean;
  toggleBulkMode: () => void;
  selectedTaskIds: string[];
  selectAllTasks: () => void;
  deselectAllTasks: () => void;
  startSelectedTasks: () => void;
  stopSelectedTasks: () => void;
  handleDeleteSelected: () => void;
  isProcessing: boolean;
  confirmDeleteOpen: boolean;
  setConfirmDeleteOpen: (open: boolean) => void;
}

const BulkOperationsBar: React.FC<BulkOperationsBarProps> = ({
  bulkModeActive,
  toggleBulkMode,
  selectedTaskIds,
  selectAllTasks,
  deselectAllTasks,
  startSelectedTasks,
  stopSelectedTasks,
  handleDeleteSelected,
  isProcessing,
  confirmDeleteOpen,
  setConfirmDeleteOpen
}) => {
  return (
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
  );
};

export default BulkOperationsBar;

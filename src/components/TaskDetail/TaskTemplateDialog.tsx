
import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TaskTemplateDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSaveTemplate: () => void;
}

const TaskTemplateDialog = ({ open, setOpen, onSaveTemplate }: TaskTemplateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Task as Template</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This will save the current task configuration as a template that you can reuse later.
          </p>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between gap-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="w-full" 
                onClick={onSaveTemplate}
              >
                Save Template
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskTemplateDialog;

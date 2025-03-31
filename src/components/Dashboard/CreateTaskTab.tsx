
import React, { useState } from "react";
import TaskForm from "@/components/Forms/TaskForm";
import { TaskType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { X, Plus } from "lucide-react";

interface CreateTaskTabProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CreateTaskTab: React.FC<CreateTaskTabProps> = ({ onSubmit, onCancel }) => {
  const [customTaskDialogOpen, setCustomTaskDialogOpen] = useState(false);
  const [customTaskType, setCustomTaskType] = useState("");
  const [customTaskTypes, setCustomTaskTypes] = useState<string[]>([]);

  const handleAddCustomTaskType = () => {
    if (customTaskType && !customTaskTypes.includes(customTaskType)) {
      setCustomTaskTypes([...customTaskTypes, customTaskType]);
      setCustomTaskType("");
      setCustomTaskDialogOpen(false);
    }
  };

  const handleRemoveCustomTaskType = (typeToRemove: string) => {
    setCustomTaskTypes(customTaskTypes.filter(type => type !== typeToRemove));
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Create Task</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setCustomTaskDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Custom Task Type
        </Button>
      </div>
      
      {customTaskTypes.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground mt-1">Custom task types:</span>
          {customTaskTypes.map(type => (
            <div 
              key={type} 
              className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-1 text-sm"
            >
              {type}
              <button 
                onClick={() => handleRemoveCustomTaskType(type)}
                className="text-muted-foreground hover:text-destructive ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="max-w-3xl mx-auto">
        <TaskForm 
          onSubmit={onSubmit}
          onCancel={onCancel}
          customTaskTypes={customTaskTypes}
        />
      </div>

      <Dialog open={customTaskDialogOpen} onOpenChange={setCustomTaskDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Custom Task Type</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input 
              placeholder="Enter custom task type" 
              value={customTaskType} 
              onChange={(e) => setCustomTaskType(e.target.value)}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddCustomTaskType}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskTab;

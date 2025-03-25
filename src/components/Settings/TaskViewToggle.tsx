
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { LayoutGrid, LayoutList } from "lucide-react";

const TaskViewToggle = () => {
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label className="text-base">Task View</Label>
        <p className="text-sm text-muted-foreground">
          Choose how tasks are displayed
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant={preferences.taskListView === "grid" ? "default" : "outline"}
          size="sm"
          onClick={() => updatePreference('taskListView', 'grid')}
        >
          <LayoutGrid className="h-4 w-4 mr-1" />
          Grid
        </Button>
        <Button
          variant={preferences.taskListView === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => updatePreference('taskListView', 'list')}
        >
          <LayoutList className="h-4 w-4 mr-1" />
          List
        </Button>
      </div>
    </div>
  );
};

export default TaskViewToggle;

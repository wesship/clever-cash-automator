
import React from "react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const TaskPreferences = () => {
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="task-sort">Default Sort Order</Label>
          <Select
            value={preferences.taskSortOrder}
            onValueChange={(value) => updatePreference('taskSortOrder', value as 'newest' | 'earnings' | 'progress')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="earnings">Highest Earnings</SelectItem>
              <SelectItem value="progress">Most Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="task-filter">Default Filter</Label>
          <Select
            value={preferences.taskFilter}
            onValueChange={(value) => updatePreference('taskFilter', value as 'all' | 'running' | 'completed' | 'pending' | 'failed')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select default filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Task Refresh Interval (seconds)</Label>
            <span className="text-sm text-muted-foreground">{preferences.taskRefreshInterval}s</span>
          </div>
          <Slider
            value={[preferences.taskRefreshInterval]}
            min={10}
            max={300}
            step={10}
            onValueChange={(value) => updatePreference('taskRefreshInterval', value[0])}
          />
        </div>
      </div>
    </div>
  );
};


import React from "react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const DisplayPreferences = () => {
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Task View</Label>
          <Select
            value={preferences.taskListView}
            onValueChange={(value) => updatePreference('taskListView', value as 'grid' | 'list')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">Grid View</SelectItem>
              <SelectItem value="list">List View</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="layout">Dashboard Layout</Label>
          <Select
            value={preferences.dashboardLayout}
            onValueChange={(value) => updatePreference('dashboardLayout', value as 'default' | 'compact' | 'detailed')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="color-accent">Color Accent</Label>
          <Select
            value={preferences.colorAccent}
            onValueChange={(value) => updatePreference('colorAccent', value as 'default' | 'blue' | 'green' | 'purple' | 'orange')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select accent color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="welcome-guide">Show Welcome Guide</Label>
          <Switch
            id="welcome-guide"
            checked={preferences.showWelcomeGuide}
            onCheckedChange={(checked) => updatePreference('showWelcomeGuide', checked)}
          />
        </div>
      </div>
    </div>
  );
};

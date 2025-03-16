
import React from "react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const NotificationPreferences = () => {
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable Notifications</Label>
          <Switch
            id="notifications"
            checked={preferences.notificationsEnabled}
            onCheckedChange={(checked) => updatePreference('notificationsEnabled', checked)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="analytics-timeframe">Analytics Default Timeframe</Label>
          <Select
            value={preferences.analyticsTimeframe}
            onValueChange={(value) => updatePreference('analyticsTimeframe', value as 'day' | 'week' | 'month' | 'year' | 'custom')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

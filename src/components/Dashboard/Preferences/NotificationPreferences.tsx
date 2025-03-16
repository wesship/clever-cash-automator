
import React from "react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { InfoIcon, BellRing, Mail } from "lucide-react";

export const NotificationPreferences = () => {
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="notifications" className="flex items-center gap-1">
              <BellRing className="h-4 w-4" />
              Enable Notifications
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <p className="text-sm text-muted-foreground">
                  Enable in-app notifications to receive alerts about important events, task status changes, and system updates.
                </p>
              </PopoverContent>
            </Popover>
          </div>
          <Switch
            id="notifications"
            checked={preferences.notificationsEnabled}
            onCheckedChange={(checked) => updatePreference('notificationsEnabled', checked)}
          />
        </div>

        {preferences.notificationsEnabled && (
          <>
            <div className="flex items-center justify-between pl-4 border-l-2 border-muted">
              <div className="flex items-center gap-2">
                <Label htmlFor="emailNotifications" className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email Notifications
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <p className="text-sm text-muted-foreground">
                      Receive notification emails for important events and updates.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <Switch
                id="emailNotifications"
                checked={preferences.emailNotificationsEnabled ?? false}
                onCheckedChange={(checked) => updatePreference('emailNotificationsEnabled', checked)}
              />
            </div>

            {preferences.emailNotificationsEnabled && (
              <div className="pl-4 border-l-2 border-muted space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="taskCompletionEmails">Task completion emails</Label>
                  <Switch
                    id="taskCompletionEmails"
                    checked={preferences.taskCompletionEmails ?? true}
                    onCheckedChange={(checked) => updatePreference('taskCompletionEmails', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="earningsSummaryEmails">Weekly earnings summary</Label>
                  <Switch
                    id="earningsSummaryEmails"
                    checked={preferences.earningsSummaryEmails ?? true}
                    onCheckedChange={(checked) => updatePreference('earningsSummaryEmails', checked)}
                  />
                </div>
              </div>
            )}
          </>
        )}
        
        <div className="space-y-2 mt-2">
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

        <div className="space-y-2">
          <Label htmlFor="notification-sound">Notification Sound</Label>
          <Select
            value={preferences.notificationSound ?? 'default'}
            onValueChange={(value) => updatePreference('notificationSound', value as 'default' | 'chime' | 'bell' | 'none')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sound" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="chime">Chime</SelectItem>
              <SelectItem value="bell">Bell</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

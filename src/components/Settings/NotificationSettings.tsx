
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useUserPreferences } from "@/hooks/use-user-preferences";

const NotificationSettings = () => {
  const { preferences, updatePreference } = useUserPreferences();

  const handleSaveChanges = () => {
    toast.success("Notification settings saved");
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Control when and how you get notified</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium">Task Completion</span>
            <p className="text-sm text-muted-foreground">
              Get notified when tasks are completed
            </p>
          </div>
          <Switch 
            checked={preferences.notificationsEnabled}
            onCheckedChange={(checked) => updatePreference('notificationsEnabled', checked)}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium">Task Failures</span>
            <p className="text-sm text-muted-foreground">
              Get notified when tasks fail
            </p>
          </div>
          <Switch 
            checked={preferences.notificationsEnabled}
            onCheckedChange={(checked) => updatePreference('notificationsEnabled', checked)}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium">Earnings Reports</span>
            <p className="text-sm text-muted-foreground">
              Get weekly earnings reports
            </p>
          </div>
          <Switch 
            checked={preferences.earningsSummaryEmails || false}
            onCheckedChange={(checked) => updatePreference('earningsSummaryEmails', checked)}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium">Email Notifications</span>
            <p className="text-sm text-muted-foreground">
              Send important notifications to email
            </p>
          </div>
          <Switch 
            checked={preferences.emailNotificationsEnabled || false}
            onCheckedChange={(checked) => updatePreference('emailNotificationsEnabled', checked)}
          />
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button className="gap-2" onClick={handleSaveChanges}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;

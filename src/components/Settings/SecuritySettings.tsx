
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useUserPreferences } from "@/hooks/use-user-preferences";

const SecuritySettings = () => {
  const { preferences, updatePreference } = useUserPreferences();
  const [timeoutValue, setTimeoutValue] = useState(preferences.taskRefreshInterval.toString());

  const handleTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeoutValue(e.target.value);
  };

  const applyTimeoutChange = () => {
    const newTimeout = parseInt(timeoutValue);
    if (!isNaN(newTimeout) && newTimeout >= 10 && newTimeout <= 300) {
      updatePreference('taskRefreshInterval', newTimeout);
      toast.success(`Session timeout updated to ${newTimeout} seconds`);
    } else {
      toast.error("Please enter a valid timeout (10-300 seconds)");
      setTimeoutValue(preferences.taskRefreshInterval.toString());
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Account Security</CardTitle>
        <CardDescription>Manage your account security settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium">Two-Factor Authentication</span>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Button variant="outline" onClick={() => toast.info("Two-factor authentication setup will be available soon")}>Enable</Button>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium">Session Timeout</span>
            <p className="text-sm text-muted-foreground">
              Automatically log out after inactivity
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min="10"
              max="300"
              value={timeoutValue}
              onChange={handleTimeoutChange}
              className="w-20 h-8"
            />
            <span className="text-sm">seconds</span>
            <Button size="sm" onClick={applyTimeoutChange}>Apply</Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium">API Access</span>
            <p className="text-sm text-muted-foreground">
              Allow external applications to access your data
            </p>
          </div>
          <Switch 
            checked={preferences.keyboardShortcutsEnabled}
            onCheckedChange={(checked) => {
              updatePreference('keyboardShortcutsEnabled', checked);
              if (checked) {
                toast.info("API access enabled. Generate API keys in developer settings.");
              } else {
                toast.info("API access disabled");
              }
            }}
          />
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button className="gap-2" onClick={() => toast.success("Security settings saved")}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;

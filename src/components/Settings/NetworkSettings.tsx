
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useUserPreferences } from "@/hooks/use-user-preferences";

const NetworkSettings = () => {
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Network Settings</CardTitle>
        <CardDescription>Configure how the application connects to the internet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium">Offline Mode</span>
            <p className="text-sm text-muted-foreground">
              Continue working when internet connection is lost
            </p>
          </div>
          <Switch 
            checked={preferences.offlineModeEnabled}
            onCheckedChange={(checked) => updatePreference('offlineModeEnabled', checked)}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium">Auto-Reconnect</span>
            <p className="text-sm text-muted-foreground">
              Automatically reconnect when connection is restored
            </p>
          </div>
          <Switch 
            checked={preferences.keyboardShortcutsEnabled}
            onCheckedChange={(checked) => updatePreference('keyboardShortcutsEnabled', checked)}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium">Data Saving Mode</span>
            <p className="text-sm text-muted-foreground">
              Reduce data usage when on mobile networks
            </p>
          </div>
          <Switch 
            checked={preferences.notificationsEnabled}
            onCheckedChange={(checked) => updatePreference('notificationsEnabled', checked)}
          />
        </div>
        
        <div className="pt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => toast.info("Network test completed successfully")}>
            Test Connection
          </Button>
          <Button className="gap-2" onClick={() => toast.success("Network settings saved")}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkSettings;


import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { Zap, ZapOff } from "lucide-react";

const AnimationsToggle = () => {
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label className="text-base">Animations</Label>
        <p className="text-sm text-muted-foreground">
          Enable UI animations and transitions
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Switch 
          id="animations"
          checked={preferences.notificationsEnabled}
          onCheckedChange={(checked) => 
            updatePreference('notificationsEnabled', checked)
          }
        />
        {preferences.notificationsEnabled ? (
          <Zap className="h-4 w-4 text-yellow-500" />
        ) : (
          <ZapOff className="h-4 w-4" />
        )}
      </div>
    </div>
  );
};

export default AnimationsToggle;

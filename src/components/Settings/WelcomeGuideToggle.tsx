
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useUserPreferences } from "@/hooks/use-user-preferences";

const WelcomeGuideToggle = () => {
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label className="text-base">Show Welcome Guide</Label>
        <p className="text-sm text-muted-foreground">
          Display onboarding guide for new users
        </p>
      </div>
      <Switch 
        id="welcome-guide"
        checked={preferences.showWelcomeGuide}
        onCheckedChange={(checked) => 
          updatePreference('showWelcomeGuide', checked)
        }
      />
    </div>
  );
};

export default WelcomeGuideToggle;

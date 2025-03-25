
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/use-theme";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { useMatrixTheme } from "@/hooks/use-matrix-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LayoutGrid, LayoutList, ZapOff, Zap, Code } from "lucide-react";

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  const { preferences, updatePreferences } = useUserPreferences();
  const { matrixEnabled, toggleMatrix } = useMatrixTheme();

  const handleToggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how AutoEarn looks and feels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Theme</Label>
              <p className="text-sm text-muted-foreground">
                Choose between light and dark mode
              </p>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="ml-4"
              onClick={handleToggleDarkMode}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Matrix Theme</Label>
              <p className="text-sm text-muted-foreground">
                Enable digital rain effect
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                id="matrix-theme"
                checked={matrixEnabled}
                onCheckedChange={toggleMatrix}
              />
              <Code className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
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
                updatePreferences({ showWelcomeGuide: checked })
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Task View</Label>
              <p className="text-sm text-muted-foreground">
                Choose how tasks are displayed
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={preferences.taskView === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => updatePreferences({ taskView: "grid" })}
              >
                <LayoutGrid className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button
                variant={preferences.taskView === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => updatePreferences({ taskView: "list" })}
              >
                <LayoutList className="h-4 w-4 mr-1" />
                List
              </Button>
            </div>
          </div>
          
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
                checked={preferences.enableAnimations}
                onCheckedChange={(checked) => 
                  updatePreferences({ enableAnimations: checked })
                }
              />
              {preferences.enableAnimations ? (
                <Zap className="h-4 w-4 text-yellow-500" />
              ) : (
                <ZapOff className="h-4 w-4" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;

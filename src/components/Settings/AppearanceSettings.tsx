
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Moon, Sun, Save } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useUserPreferences } from "@/hooks/use-user-preferences";

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the application looks and feels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="font-medium">Theme</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Choose between light and dark theme
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Light</span>
              <Switch 
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
              <span className="text-sm">Dark</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-medium">Welcome Guide</span>
              <p className="text-sm text-muted-foreground">
                Show welcome guide for new users
              </p>
            </div>
            <Switch 
              checked={preferences.showWelcomeGuide}
              onCheckedChange={(checked) => updatePreference('showWelcomeGuide', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-medium">Task View</span>
              <p className="text-sm text-muted-foreground">
                Default task view style
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant={preferences.taskListView === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => updatePreference('taskListView', 'grid')}
              >
                Grid
              </Button>
              <Button 
                variant={preferences.taskListView === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => updatePreference('taskListView', 'list')}
              >
                List
              </Button>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button className="gap-2" onClick={() => toast.success("Settings saved successfully")}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>User Interface</CardTitle>
          <CardDescription>Customize the behavior of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-medium">Animations</span>
              <p className="text-sm text-muted-foreground">
                Enable UI animations
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
              <span className="font-medium">Autostart Tasks</span>
              <p className="text-sm text-muted-foreground">
                Automatically start scheduled tasks on login
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
              <span className="font-medium">Confirm Actions</span>
              <p className="text-sm text-muted-foreground">
                Show confirmation dialogs for important actions
              </p>
            </div>
            <Switch 
              checked={preferences.offlineModeEnabled}
              onCheckedChange={(checked) => updatePreference('offlineModeEnabled', checked)}
            />
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button className="gap-2" onClick={() => toast.success("Settings saved successfully")}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AppearanceSettings;

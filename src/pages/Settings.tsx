
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Save, Wifi, Bell, Shield, User, Moon, Sun, Clock, RefreshCw, Download, Upload, AlertTriangle } from "lucide-react";
import Background3D from "@/components/ui/3d-background";
import { useTheme } from "@/hooks/use-theme";
import { useUserPreferences } from "@/hooks/use-user-preferences";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { preferences, updatePreference, resetPreferences, exportPreferences, importPreferences } = useUserPreferences();
  const [importData, setImportData] = useState("");
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [timeoutValue, setTimeoutValue] = useState(preferences.taskRefreshInterval.toString());
  
  const handleImport = () => {
    const success = importPreferences(importData);
    if (success) {
      setIsImportDialogOpen(false);
      setImportData("");
    }
  };
  
  const handleExport = () => {
    const data = exportPreferences();
    
    // Create a download link
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = "autoearn-preferences.json";
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Preferences exported successfully");
  };

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
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-gradient">Settings</span>
            </h1>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="general" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="network" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <Wifi className="h-4 w-4 mr-2" />
                Network
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 animate-fade-in">
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
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 animate-fade-in">
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
                    <Switch defaultChecked 
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
                    <Switch defaultChecked 
                      checked={preferences.keyboardShortcutsEnabled}
                      onCheckedChange={(checked) => updatePreference('keyboardShortcutsEnabled', checked)}
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
                      checked={preferences.offlineModeEnabled}
                      onCheckedChange={(checked) => updatePreference('offlineModeEnabled', checked)}
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button className="gap-2" onClick={() => toast.success("Notification settings saved")}>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 animate-fade-in">
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
            </TabsContent>

            <TabsContent value="network" className="space-y-6 animate-fade-in">
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
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Import and export your preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Upload className="mr-2 h-4 w-4" />
                          Import Preferences
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Import Preferences</DialogTitle>
                          <DialogDescription>
                            Paste your exported preferences JSON below
                          </DialogDescription>
                        </DialogHeader>
                        <Textarea
                          placeholder='{"showWelcomeGuide":false,...}'
                          value={importData}
                          onChange={(e) => setImportData(e.target.value)}
                          className="min-h-[200px]"
                        />
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleImport}>
                            Import
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" onClick={handleExport}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Preferences
                    </Button>
                  </div>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="mt-4 w-full">
                        <RefreshCw className="mr-2 h-4 w-4" /> 
                        Reset All Preferences
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reset Preferences</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will reset all preferences to their default values. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                          resetPreferences();
                          toast.success("All preferences have been reset to default values");
                        }}>
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Reset
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;

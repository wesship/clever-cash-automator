
import React, { useState } from "react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Download, Upload, RefreshCw, AlertTriangle } from "lucide-react";

export const UserPreferencesPanel = () => {
  const { preferences, updatePreference, resetPreferences, setMultiplePreferences, exportPreferences, importPreferences } = useUserPreferences();
  const [importData, setImportData] = useState("");
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>User Preferences</CardTitle>
        <CardDescription>
          Customize your AutoEarn experience
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="display">
        <div className="px-6">
          <TabsList className="w-full">
            <TabsTrigger value="display" className="flex-1">Display</TabsTrigger>
            <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6">
          <TabsContent value="display" className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Task View</Label>
                <Select
                  value={preferences.taskListView}
                  onValueChange={(value) => updatePreference('taskListView', value as 'grid' | 'list')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="layout">Dashboard Layout</Label>
                <Select
                  value={preferences.dashboardLayout}
                  onValueChange={(value) => updatePreference('dashboardLayout', value as 'default' | 'compact' | 'detailed')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color-accent">Color Accent</Label>
                <Select
                  value={preferences.colorAccent}
                  onValueChange={(value) => updatePreference('colorAccent', value as 'default' | 'blue' | 'green' | 'purple' | 'orange')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accent color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="welcome-guide">Show Welcome Guide</Label>
                <Switch
                  id="welcome-guide"
                  checked={preferences.showWelcomeGuide}
                  onCheckedChange={(checked) => updatePreference('showWelcomeGuide', checked)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-sort">Default Sort Order</Label>
                <Select
                  value={preferences.taskSortOrder}
                  onValueChange={(value) => updatePreference('taskSortOrder', value as 'newest' | 'earnings' | 'progress')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sort order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="earnings">Highest Earnings</SelectItem>
                    <SelectItem value="progress">Most Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-filter">Default Filter</Label>
                <Select
                  value={preferences.taskFilter}
                  onValueChange={(value) => updatePreference('taskFilter', value as 'all' | 'running' | 'completed' | 'pending' | 'failed')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select default filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tasks</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Task Refresh Interval (seconds)</Label>
                  <span className="text-sm text-muted-foreground">{preferences.taskRefreshInterval}s</span>
                </div>
                <Slider
                  value={[preferences.taskRefreshInterval]}
                  min={10}
                  max={300}
                  step={10}
                  onValueChange={(value) => updatePreference('taskRefreshInterval', value[0])}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
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
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="keyboard-shortcuts">Enable Keyboard Shortcuts</Label>
                <Switch
                  id="keyboard-shortcuts"
                  checked={preferences.keyboardShortcutsEnabled}
                  onCheckedChange={(checked) => updatePreference('keyboardShortcutsEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="offline-mode">Enable Offline Mode</Label>
                <Switch
                  id="offline-mode"
                  checked={preferences.offlineModeEnabled}
                  onCheckedChange={(checked) => updatePreference('offlineModeEnabled', checked)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 pt-4">
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
                  <Button variant="destructive" className="mt-4">
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
                    <AlertDialogAction onClick={resetPreferences}>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Reset
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="border-t px-6 py-4 bg-muted/50">
        <p className="text-xs text-muted-foreground">
          All preferences are stored locally in your browser.
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserPreferencesPanel;

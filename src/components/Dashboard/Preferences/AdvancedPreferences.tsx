
import React, { useState } from "react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Download, Upload, RefreshCw, AlertTriangle } from "lucide-react";

export const AdvancedPreferences = () => {
  const { preferences, updatePreference, resetPreferences, exportPreferences, importPreferences } = useUserPreferences();
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
    <div className="space-y-6">
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
    </div>
  );
};

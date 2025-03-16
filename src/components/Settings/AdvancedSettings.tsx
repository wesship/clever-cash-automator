
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { RefreshCw, Download, Upload, AlertTriangle } from "lucide-react";

const AdvancedSettings = () => {
  const { resetPreferences, exportPreferences, importPreferences } = useUserPreferences();
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
  );
};

export default AdvancedSettings;

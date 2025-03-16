
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useUserPreferences } from '@/hooks/use-user-preferences';
import { X } from 'lucide-react';

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcutsDialog({ open, onOpenChange }: KeyboardShortcutsDialogProps) {
  const { shortcuts } = useKeyboardShortcuts({});
  const { preferences, updatePreference } = useUserPreferences();

  const toggleShortcuts = () => {
    updatePreference('keyboardShortcutsEnabled', !preferences.keyboardShortcutsEnabled);
  };

  const formatShortcut = (shortcut: typeof shortcuts[0]) => {
    const parts = [];
    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.altKey) parts.push('Alt');
    if (shortcut.shiftKey) parts.push('Shift');
    parts.push(shortcut.key.toUpperCase());
    
    return parts.join(' + ');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Keyboard shortcuts help you navigate and perform actions quickly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shortcut</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shortcuts.map((shortcut, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">
                    {formatShortcut(shortcut)}
                  </TableCell>
                  <TableCell>{shortcut.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex items-center space-x-2">
            <Button 
              variant={preferences.keyboardShortcutsEnabled ? "default" : "outline"} 
              onClick={toggleShortcuts}
              className="w-full sm:w-auto"
            >
              {preferences.keyboardShortcutsEnabled ? "Disable Shortcuts" : "Enable Shortcuts"}
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default KeyboardShortcutsDialog;

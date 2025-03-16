
import { useEffect, useState } from 'react';
import { useUserPreferences } from './use-user-preferences';
import { toast } from 'sonner';

type ShortcutAction = 'createTask' | 'toggleView' | 'toggleTheme' | 'viewTasks' | 'viewOverview' | 'toggleHelp';

interface KeyboardShortcut {
  key: string;
  description: string;
  action: ShortcutAction;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
}

export const useKeyboardShortcuts = (callbacks: {
  [key in ShortcutAction]?: () => void;
}) => {
  const { preferences } = useUserPreferences();
  const [helpVisible, setHelpVisible] = useState(false);
  
  // Define the available shortcuts
  const shortcuts: KeyboardShortcut[] = [
    { key: 'n', description: 'New Task', action: 'createTask', ctrlKey: true },
    { key: 'v', description: 'Toggle View (Grid/List)', action: 'toggleView', ctrlKey: true },
    { key: 'd', description: 'Toggle Dark/Light mode', action: 'toggleTheme', ctrlKey: true },
    { key: '1', description: 'View Overview', action: 'viewOverview', altKey: true },
    { key: '2', description: 'View Tasks', action: 'viewTasks', altKey: true },
    { key: '?', description: 'Show Keyboard Shortcuts', action: 'toggleHelp' },
  ];

  useEffect(() => {
    if (!preferences.keyboardShortcutsEnabled) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement)?.tagName)) {
        return;
      }
      
      const matchedShortcut = shortcuts.find(shortcut => {
        const keyMatch = shortcut.key.toLowerCase() === event.key.toLowerCase();
        const ctrlMatch = shortcut.ctrlKey ? event.ctrlKey : !event.ctrlKey;
        const altMatch = shortcut.altKey ? event.altKey : !event.altKey;
        const shiftMatch = shortcut.shiftKey ? event.shiftKey : !event.shiftKey;
        
        return keyMatch && ctrlMatch && altMatch && shiftMatch;
      });
      
      if (matchedShortcut) {
        event.preventDefault();
        
        if (matchedShortcut.action === 'toggleHelp') {
          setHelpVisible(prev => !prev);
          if (!helpVisible) {
            toast.info('Keyboard shortcuts help visible. Press ? to hide.');
          }
          return;
        }
        
        const callback = callbacks[matchedShortcut.action];
        if (callback) {
          callback();
          toast.info(`Shortcut: ${matchedShortcut.description}`);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [preferences.keyboardShortcutsEnabled, callbacks, helpVisible, shortcuts]);
  
  // Return the current state and the list of available shortcuts
  return {
    shortcuts,
    helpVisible,
    setHelpVisible
  };
};

export default useKeyboardShortcuts;

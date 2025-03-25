
import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import useLocalStorage from './use-local-storage';
import { toast } from "sonner";

interface UserPreferences {
  showWelcomeGuide: boolean;
  taskListView: 'grid' | 'list';
  dashboardLayout: 'default' | 'compact' | 'detailed';
  taskSortOrder: 'newest' | 'earnings' | 'progress';
  taskFilter: 'all' | 'running' | 'completed' | 'pending' | 'failed';
  notificationsEnabled: boolean;
  emailNotificationsEnabled?: boolean;
  taskCompletionEmails?: boolean;
  earningsSummaryEmails?: boolean;
  notificationSound?: 'default' | 'chime' | 'bell' | 'none';
  analyticsTimeframe: 'day' | 'week' | 'month' | 'year' | 'custom';
  customTimeframe?: {
    startDate?: Date;
    endDate?: Date;
  };
  keyboardShortcutsEnabled: boolean;
  offlineModeEnabled: boolean;
  lastSyncTimestamp?: number;
  colorAccent: 'default' | 'blue' | 'green' | 'purple' | 'orange';
  taskRefreshInterval: number; // in seconds
}

const defaultPreferences: UserPreferences = {
  showWelcomeGuide: true,
  taskListView: 'grid',
  dashboardLayout: 'default',
  taskSortOrder: 'newest',
  taskFilter: 'all',
  notificationsEnabled: true,
  emailNotificationsEnabled: false,
  taskCompletionEmails: true,
  earningsSummaryEmails: true,
  notificationSound: 'default',
  analyticsTimeframe: 'week',
  keyboardShortcutsEnabled: false,
  offlineModeEnabled: true,
  colorAccent: 'default',
  taskRefreshInterval: 60,
};

interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void;
  resetPreferences: () => void;
  setMultiplePreferences: (updates: Partial<UserPreferences>) => void;
  exportPreferences: () => string;
  importPreferences: (jsonString: string) => boolean;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences, removePreferences] = useLocalStorage<UserPreferences>(
    'user-preferences',
    defaultPreferences
  );

  // Using useCallback to prevent unnecessary rerenders and potential infinite loops
  const updatePreference = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));
    
    // Show a toast notification for certain preference changes
    if (key === 'taskListView' || key === 'dashboardLayout') {
      toast.success(`Display updated: ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} set to ${String(value)}`);
    } else if (key === 'notificationsEnabled') {
      toast.info(`Notifications ${value ? 'enabled' : 'disabled'}`);
    } else if (key === 'emailNotificationsEnabled') {
      toast.info(`Email notifications ${value ? 'enabled' : 'disabled'}`);
    }
  }, [setPreferences]);

  const setMultiplePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences((current) => ({
      ...current,
      ...updates,
    }));
    toast.success('Preferences updated successfully');
  }, [setPreferences]);

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
    toast.success('Preferences reset to defaults');
  }, [setPreferences]);
  
  // Export preferences as a JSON string
  const exportPreferences = useCallback((): string => {
    try {
      return JSON.stringify(preferences);
    } catch (error) {
      toast.error('Failed to export preferences');
      console.error('Failed to export preferences:', error);
      return '';
    }
  }, [preferences]);
  
  // Import preferences from a JSON string
  const importPreferences = useCallback((jsonString: string): boolean => {
    try {
      const imported = JSON.parse(jsonString) as UserPreferences;
      // Validate the imported data has the correct structure
      if (!imported || typeof imported !== 'object') {
        throw new Error('Invalid preferences format');
      }
      
      // Merge with defaults to ensure all required properties exist
      setPreferences({
        ...defaultPreferences,
        ...imported,
      });
      
      toast.success('Preferences imported successfully');
      return true;
    } catch (error) {
      toast.error('Failed to import preferences: Invalid format');
      console.error('Failed to import preferences:', error);
      return false;
    }
  }, [setPreferences]);

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreference,
        resetPreferences,
        setMultiplePreferences,
        exportPreferences,
        importPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const useUserPreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};

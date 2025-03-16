
import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from './use-local-storage';

interface UserPreferences {
  showWelcomeGuide: boolean;
  taskListView: 'grid' | 'list';
  dashboardLayout: 'default' | 'compact' | 'detailed';
  taskSortOrder: 'newest' | 'earnings' | 'progress';
  taskFilter: 'all' | 'running' | 'completed' | 'pending' | 'failed';
  notificationsEnabled: boolean;
  analyticsTimeframe: 'day' | 'week' | 'month' | 'year';
}

const defaultPreferences: UserPreferences = {
  showWelcomeGuide: true,
  taskListView: 'grid',
  dashboardLayout: 'default',
  taskSortOrder: 'newest',
  taskFilter: 'all',
  notificationsEnabled: true,
  analyticsTimeframe: 'week',
};

interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void;
  resetPreferences: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences, removePreferences] = useLocalStorage<UserPreferences>(
    'user-preferences',
    defaultPreferences
  );

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreference,
        resetPreferences,
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


import { useState, useEffect } from 'react';
import { useUserPreferences } from './use-user-preferences';
import { toast } from 'sonner';

export const useOfflineMode = () => {
  const { preferences, updatePreference } = useUserPreferences();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSyncs, setPendingSyncs] = useState<any[]>([]);
  
  const isOfflineMode = !isOnline || preferences.offlineModeEnabled;
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (pendingSyncs.length > 0) {
        toast.info(`You're back online. Syncing ${pendingSyncs.length} pending changes...`);
        syncPendingChanges();
      } else {
        toast.success("You're back online!");
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("You're offline. Changes will be saved locally.");
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingSyncs]);
  
  // Function to queue changes when offline
  const queueChange = (change: any) => {
    setPendingSyncs(prev => [...prev, { ...change, timestamp: Date.now() }]);
    updatePreference('lastSyncTimestamp', Date.now());
    toast.info('Change queued for sync when back online');
    return true;
  };
  
  // Function to sync changes when back online
  const syncPendingChanges = async () => {
    if (pendingSyncs.length === 0) return;
    
    try {
      // In a real app, this would send the changes to a server API
      // For now we'll just simulate a successful sync
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      updatePreference('lastSyncTimestamp', Date.now());
      setPendingSyncs([]);
      toast.success('All changes synced successfully!');
    } catch (error) {
      console.error('Sync failed:', error);
      toast.error('Sync failed. Will retry later.');
    }
  };
  
  return {
    isOnline,
    isOfflineMode,
    pendingSyncs,
    queueChange,
    syncPendingChanges,
    pendingSyncCount: pendingSyncs.length
  };
};

export default useOfflineMode;

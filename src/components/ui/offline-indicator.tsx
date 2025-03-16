
import React from 'react';
import { useOfflineMode } from '@/hooks/use-offline-mode';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Wifi, WifiOff, Cloud, CloudOff } from 'lucide-react';

interface OfflineIndicatorProps {
  className?: string;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ className }) => {
  const { isOnline, isOfflineMode, pendingSyncCount, syncPendingChanges } = useOfflineMode();
  
  if (isOnline && !isOfflineMode) {
    return null;
  }
  
  return (
    <div className={cn(
      "flex items-center space-x-2 rounded-lg px-3 py-1 bg-background border animate-fade-in",
      isOnline ? "border-yellow-500/50" : "border-destructive/50",
      className
    )}>
      {isOnline ? (
        <CloudOff className="h-4 w-4 text-yellow-500" />
      ) : (
        <WifiOff className="h-4 w-4 text-destructive" />
      )}
      
      <span className="text-sm font-medium">
        {isOnline ? "Offline Mode" : "You're offline"}
      </span>
      
      {pendingSyncCount > 0 && (
        <>
          <Badge variant="outline" className="bg-background text-foreground">
            {pendingSyncCount} {pendingSyncCount === 1 ? 'change' : 'changes'} pending
          </Badge>
          
          {isOnline && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={syncPendingChanges}
              className="h-7 px-2 text-xs"
            >
              <Cloud className="h-3 w-3 mr-1" />
              Sync now
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default OfflineIndicator;


import { useCallback, useEffect, useRef } from 'react';
import logger, { LogLevel } from '@/lib/logging/enhanced-logger';

export interface UseEnhancedLoggingOptions {
  namespace?: string;
  captureConsole?: boolean;
  level?: LogLevel;
}

export const useEnhancedLogging = (options: UseEnhancedLoggingOptions = {}) => {
  const { namespace, captureConsole = false, level } = options;
  const taskLoggerRef = useRef(namespace ? logger.createTaskLogger(namespace) : null);
  
  // Set log level if provided
  useEffect(() => {
    if (level !== undefined) {
      logger.setLogLevel(level);
    }
  }, [level]);
  
  // Optionally capture console logs
  useEffect(() => {
    if (!captureConsole) return;
    
    const originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
      debug: console.debug
    };
    
    // Override console methods
    console.log = (...args) => {
      originalConsole.log(...args);
      logger.info(args.map(arg => String(arg)).join(' '), { source: 'console.log' }, ['console'], namespace);
    };
    
    console.info = (...args) => {
      originalConsole.info(...args);
      logger.info(args.map(arg => String(arg)).join(' '), { source: 'console.info' }, ['console'], namespace);
    };
    
    console.warn = (...args) => {
      originalConsole.warn(...args);
      logger.warn(args.map(arg => String(arg)).join(' '), { source: 'console.warn' }, ['console'], namespace);
    };
    
    console.error = (...args) => {
      originalConsole.error(...args);
      logger.error(args.map(arg => String(arg)).join(' '), { source: 'console.error' }, ['console'], namespace);
    };
    
    console.debug = (...args) => {
      originalConsole.debug(...args);
      logger.debug(args.map(arg => String(arg)).join(' '), { source: 'console.debug' }, ['console'], namespace);
    };
    
    // Restore original console methods on unmount
    return () => {
      console.log = originalConsole.log;
      console.info = originalConsole.info;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
      console.debug = originalConsole.debug;
    };
  }, [captureConsole, namespace]);
  
  // Log methods that include namespace automatically
  const log = useCallback((level: LogLevel, message: string, context?: Record<string, any>, tags?: string[]) => {
    switch (level) {
      case LogLevel.DEBUG:
        if (taskLoggerRef.current) {
          taskLoggerRef.current.debug(message, context, tags);
        } else {
          logger.debug(message, context, tags, namespace);
        }
        break;
      case LogLevel.INFO:
        if (taskLoggerRef.current) {
          taskLoggerRef.current.info(message, context, tags);
        } else {
          logger.info(message, context, tags, namespace);
        }
        break;
      case LogLevel.WARN:
        if (taskLoggerRef.current) {
          taskLoggerRef.current.warn(message, context, tags);
        } else {
          logger.warn(message, context, tags, namespace);
        }
        break;
      case LogLevel.ERROR:
        if (taskLoggerRef.current) {
          taskLoggerRef.current.error(message, context, tags);
        } else {
          logger.error(message, context, tags, namespace);
        }
        break;
    }
  }, [namespace]);
  
  const debug = useCallback((message: string, context?: Record<string, any>, tags?: string[]) => {
    log(LogLevel.DEBUG, message, context, tags);
  }, [log]);
  
  const info = useCallback((message: string, context?: Record<string, any>, tags?: string[]) => {
    log(LogLevel.INFO, message, context, tags);
  }, [log]);
  
  const warn = useCallback((message: string, context?: Record<string, any>, tags?: string[]) => {
    log(LogLevel.WARN, message, context, tags);
  }, [log]);
  
  const error = useCallback((message: string, context?: Record<string, any>, tags?: string[]) => {
    log(LogLevel.ERROR, message, context, tags);
  }, [log]);
  
  // Get logs for this namespace
  const getLogs = useCallback(() => {
    if (taskLoggerRef.current) {
      return taskLoggerRef.current.getLogs();
    }
    return namespace ? logger.getNamespaceLogs(namespace) : logger.getAllLogs();
  }, [namespace]);
  
  // Clear logs for this namespace
  const clearLogs = useCallback(() => {
    if (namespace) {
      logger.clearNamespaceLogs(namespace);
    } else {
      logger.clearAllLogs();
    }
  }, [namespace]);
  
  // Export logs for this namespace
  const exportLogs = useCallback(() => {
    return logger.exportLogs(namespace);
  }, [namespace]);
  
  return {
    debug,
    info,
    warn,
    error,
    getLogs,
    clearLogs,
    exportLogs
  };
};

export default useEnhancedLogging;

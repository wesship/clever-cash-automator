
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  tags?: string[];
}

export class EnhancedLogger {
  private static instance: EnhancedLogger;
  private logs: Map<string, LogEntry[]> = new Map();
  private globalLogs: LogEntry[] = [];
  private logLevel: LogLevel = LogLevel.INFO;
  private logListeners: Set<(entry: LogEntry) => void> = new Set();
  
  // Make this a singleton
  private constructor() {}
  
  public static getInstance(): EnhancedLogger {
    if (!EnhancedLogger.instance) {
      EnhancedLogger.instance = new EnhancedLogger();
    }
    return EnhancedLogger.instance;
  }
  
  /**
   * Set the minimum log level
   */
  public setLogLevel(level: LogLevel) {
    this.logLevel = level;
  }
  
  /**
   * Log a debug message
   */
  public debug(message: string, context?: Record<string, any>, tags?: string[], namespace?: string) {
    this.log(LogLevel.DEBUG, message, context, tags, namespace);
  }
  
  /**
   * Log an info message
   */
  public info(message: string, context?: Record<string, any>, tags?: string[], namespace?: string) {
    this.log(LogLevel.INFO, message, context, tags, namespace);
  }
  
  /**
   * Log a warning message
   */
  public warn(message: string, context?: Record<string, any>, tags?: string[], namespace?: string) {
    this.log(LogLevel.WARN, message, context, tags, namespace);
  }
  
  /**
   * Log an error message
   */
  public error(message: string, context?: Record<string, any>, tags?: string[], namespace?: string) {
    this.log(LogLevel.ERROR, message, context, tags, namespace);
  }
  
  /**
   * Task-specific logger that includes task ID in all logs
   */
  public createTaskLogger(taskId: string) {
    return {
      debug: (message: string, context?: Record<string, any>, tags?: string[]) => 
        this.debug(message, { ...context, taskId }, tags, `task:${taskId}`),
      
      info: (message: string, context?: Record<string, any>, tags?: string[]) => 
        this.info(message, { ...context, taskId }, tags, `task:${taskId}`),
      
      warn: (message: string, context?: Record<string, any>, tags?: string[]) => 
        this.warn(message, { ...context, taskId }, tags, `task:${taskId}`),
      
      error: (message: string, context?: Record<string, any>, tags?: string[]) => 
        this.error(message, { ...context, taskId }, tags, `task:${taskId}`),
      
      // Get logs specific to this task
      getLogs: () => this.getNamespaceLogs(`task:${taskId}`)
    };
  }
  
  /**
   * Get all logs
   */
  public getAllLogs(): LogEntry[] {
    return [...this.globalLogs];
  }
  
  /**
   * Get logs for a specific namespace
   */
  public getNamespaceLogs(namespace: string): LogEntry[] {
    return this.logs.get(namespace) || [];
  }
  
  /**
   * Clear logs for a specific namespace
   */
  public clearNamespaceLogs(namespace: string): void {
    this.logs.delete(namespace);
  }
  
  /**
   * Clear all logs
   */
  public clearAllLogs(): void {
    this.logs.clear();
    this.globalLogs = [];
  }
  
  /**
   * Add a log listener
   */
  public addLogListener(listener: (entry: LogEntry) => void): void {
    this.logListeners.add(listener);
  }
  
  /**
   * Remove a log listener
   */
  public removeLogListener(listener: (entry: LogEntry) => void): void {
    this.logListeners.delete(listener);
  }
  
  /**
   * Filter logs by level, tags, and/or context properties
   */
  public filterLogs(options: {
    level?: LogLevel,
    tags?: string[],
    context?: Record<string, any>
  }): LogEntry[] {
    return this.globalLogs.filter(entry => {
      // Filter by level
      if (options.level !== undefined && entry.level < options.level) {
        return false;
      }
      
      // Filter by tags
      if (options.tags && options.tags.length > 0) {
        if (!entry.tags || !options.tags.some(tag => entry.tags!.includes(tag))) {
          return false;
        }
      }
      
      // Filter by context properties
      if (options.context) {
        if (!entry.context) return false;
        
        for (const [key, value] of Object.entries(options.context)) {
          if (entry.context[key] !== value) {
            return false;
          }
        }
      }
      
      return true;
    });
  }
  
  /**
   * Export logs to JSON
   */
  public exportLogs(namespace?: string): string {
    const logsToExport = namespace 
      ? this.getNamespaceLogs(namespace)
      : this.globalLogs;
    
    return JSON.stringify(logsToExport, (key, value) => {
      // Handle Date serialization
      if (key === 'timestamp' && value instanceof Date) {
        return value.toISOString();
      }
      return value;
    }, 2);
  }
  
  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, context?: Record<string, any>, tags?: string[], namespace?: string) {
    // Skip if below current log level
    if (level < this.logLevel) {
      return;
    }
    
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      context,
      tags
    };
    
    // Add to global logs
    this.globalLogs.push(entry);
    
    // Add to namespace-specific logs if provided
    if (namespace) {
      const namespaceLogs = this.logs.get(namespace) || [];
      namespaceLogs.push(entry);
      this.logs.set(namespace, namespaceLogs);
    }
    
    // Log to console
    this.logToConsole(entry);
    
    // Notify listeners
    this.notifyListeners(entry);
  }
  
  /**
   * Log to console with formatting
   */
  private logToConsole(entry: LogEntry) {
    const timestamp = entry.timestamp.toISOString();
    const context = entry.context ? `${JSON.stringify(entry.context)}` : '';
    const tags = entry.tags && entry.tags.length > 0 ? `[${entry.tags.join(', ')}]` : '';
    
    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(`${timestamp} [DEBUG] ${tags} ${entry.message}`, context);
        break;
      case LogLevel.INFO:
        console.info(`${timestamp} [INFO] ${tags} ${entry.message}`, context);
        break;
      case LogLevel.WARN:
        console.warn(`${timestamp} [WARN] ${tags} ${entry.message}`, context);
        break;
      case LogLevel.ERROR:
        console.error(`${timestamp} [ERROR] ${tags} ${entry.message}`, context);
        break;
    }
  }
  
  /**
   * Notify all listeners about a log entry
   */
  private notifyListeners(entry: LogEntry): void {
    this.logListeners.forEach(listener => {
      try {
        listener(entry);
      } catch (error) {
        console.error("Error in log listener:", error);
      }
    });
  }
}

// Export a singleton instance
export const logger = EnhancedLogger.getInstance();

// Export log level for convenience
export { LogLevel };

export default logger;


import { toast } from 'sonner';
import type { ToasterToast } from "sonner";

export interface NotificationOptions {
  title?: string;
  message: string;
  duration?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

export class NotificationManager {
  private static instance: NotificationManager;
  private permissionGranted: boolean = false;
  private static _notificationsEnabled: boolean = true;
  
  private constructor() {
    // Singleton pattern
  }
  
  public static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }
  
  public static async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }
    
    try {
      if (Notification.permission === 'granted') {
        NotificationManager.getInstance().permissionGranted = true;
        return true;
      }
      
      if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        const granted = permission === 'granted';
        NotificationManager.getInstance().permissionGranted = granted;
        return granted;
      }
      
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }
  
  // Add getter and setter for notificationsEnabled
  public static get notificationsEnabled(): boolean {
    return NotificationManager._notificationsEnabled;
  }

  public static setNotificationsEnabled(value: boolean): void {
    NotificationManager._notificationsEnabled = value;
  }
  
  public static showNotification(options: NotificationOptions): void {
    // Skip notifications if disabled
    if (!NotificationManager._notificationsEnabled) {
      return;
    }

    // In-app notification using toast
    this.showToast(options);
    
    // Browser notification if permission is granted
    if (NotificationManager.getInstance().permissionGranted) {
      try {
        new Notification(options.title || 'Notification', {
          body: options.message,
          icon: '/favicon.ico',
        });
      } catch (error) {
        console.error('Error showing browser notification:', error);
      }
    }
  }
  
  private static showToast(options: NotificationOptions): void {
    const toastOptions: Partial<ToasterToast> = {
      duration: options.duration || 5000,
      position: options.position as any || 'top-right',
      id: `notification-${Date.now()}`
    };
    
    switch (options.type) {
      case 'success':
        toast.success(options.message, {
          ...toastOptions,
          // Safe to include variant for custom styles that may be consumed by your app
          // but it won't be passed to the ExternalToast type
        });
        break;
      case 'error':
        toast.error(options.message, {
          ...toastOptions,
        });
        break;
      case 'warning':
        toast(options.message, {
          ...toastOptions,
          // Customize for warning
          style: { backgroundColor: 'var(--vibrant-yellow)', color: 'var(--foreground)' }
        });
        break;
      case 'info':
        toast.info(options.message, {
          ...toastOptions,
        });
        break;
      default:
        toast(options.message, toastOptions);
    }
  }

  public static notifyTaskStatus(task: any, status: any): void {
    const statusMessages = {
      COMPLETED: `Task "${task.name}" completed successfully`,
      FAILED: `Task "${task.name}" failed`,
      RUNNING: `Task "${task.name}" started running`,
      PAUSED: `Task "${task.name}" paused`,
    };

    const statusTypes = {
      COMPLETED: 'success',
      FAILED: 'error',
      RUNNING: 'info',
      PAUSED: 'info',
    };

    const message = statusMessages[status] || `Task "${task.name}" status: ${status}`;
    const type = statusTypes[status] || 'default';

    this.showNotification({
      title: 'Task Status Update',
      message,
      type: type as 'success' | 'error' | 'warning' | 'info' | 'default',
    });
  }
  
  public static notifyTaskSuccess(taskName: string): void {
    this.showNotification({
      title: 'Task Completed',
      message: `Task "${taskName}" has completed successfully`,
      type: 'success',
    });
  }
  
  public static notifyTaskFailure(taskName: string, error?: string): void {
    this.showNotification({
      title: 'Task Failed',
      message: `Task "${taskName}" has failed${error ? `: ${error}` : ''}`,
      type: 'error',
    });
  }
  
  public static notifyTaskProgress(taskName: string, progress: number): void {
    if (progress % 25 === 0) { // Only notify at 25%, 50%, 75% and 100%
      this.showNotification({
        title: 'Task Progress',
        message: `Task "${taskName}" is ${progress}% complete`,
        type: 'info',
      });
    }
  }
}

export default NotificationManager;


import { toast } from "sonner";
import { TaskStatus, Task } from "@/lib/types";

/**
 * Centralized notification manager for the application
 */
export class NotificationManager {
  // Control whether notifications are enabled
  private static _notificationsEnabled = true;
  
  // Store users with permission granted status
  private static hasNotificationPermission = false;
  
  /**
   * Initialize notification system
   */
  static init() {
    // Check if browser supports notifications
    if ("Notification" in window) {
      // Check if permission is already granted
      if (Notification.permission === "granted") {
        this.hasNotificationPermission = true;
      }
    }
  }
  
  /**
   * Request permission for browser notifications
   */
  static async requestPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      return false;
    }
    
    try {
      const permission = await Notification.requestPermission();
      this.hasNotificationPermission = permission === "granted";
      return this.hasNotificationPermission;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }
  
  /**
   * Send a task status notification
   */
  static notifyTaskStatus(task: Task, status: TaskStatus) {
    if (!this._notificationsEnabled) return;
    
    const title = `Task ${status}`;
    let message = "";
    let variant: "default" | "success" | "warning" | "error" | "info" = "default";
    
    switch (status) {
      case TaskStatus.COMPLETED:
        message = `Task "${task.name}" completed successfully.`;
        variant = "success";
        break;
      case TaskStatus.FAILED:
        message = `Task "${task.name}" failed.`;
        variant = "error";
        break;
      case TaskStatus.RUNNING:
        message = `Task "${task.name}" is now running.`;
        variant = "info";
        break;
      case TaskStatus.PAUSED:
        message = `Task "${task.name}" has been paused.`;
        variant = "warning";
        break;
      case TaskStatus.CANCELLED:
        message = `Task "${task.name}" has been cancelled.`;
        variant = "warning";
        break;
      default:
        message = `Task "${task.name}" status: ${status}`;
    }
    
    // Show toast notification
    toast(title, {
      description: message,
      variant,
    });
    
    // Show browser notification if permission granted
    if (this.hasNotificationPermission) {
      new Notification(title, {
        body: message,
        icon: "/favicon.ico"
      });
    }
  }
  
  /**
   * Send an earnings notification
   */
  static notifyEarnings(task: Task, amount: number) {
    if (!this._notificationsEnabled) return;
    
    const title = "Earnings Update";
    const message = `You earned $${amount.toFixed(2)} from task "${task.name}".`;
    
    // Show toast notification
    toast(title, {
      description: message,
      variant: "success",
    });
    
    // Show browser notification if permission granted
    if (this.hasNotificationPermission) {
      new Notification(title, {
        body: message,
        icon: "/favicon.ico"
      });
    }
  }
  
  /**
   * Send a system notification
   */
  static notify(title: string, message: string, variant: "default" | "success" | "warning" | "error" | "info" = "default") {
    if (!this._notificationsEnabled) return;
    
    // Show toast notification
    toast(title, {
      description: message,
      variant,
    });
    
    // Show browser notification if permission granted
    if (this.hasNotificationPermission) {
      new Notification(title, {
        body: message,
        icon: "/favicon.ico"
      });
    }
  }
  
  /**
   * Enable or disable notifications
   */
  static setNotificationsEnabled(enabled: boolean) {
    this._notificationsEnabled = enabled;
  }
  
  /**
   * Check if notifications are enabled
   */
  static get notificationsEnabled(): boolean {
    return this._notificationsEnabled;
  }
}

// Initialize notifications on import
NotificationManager.init();

export default NotificationManager;

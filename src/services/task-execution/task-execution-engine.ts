
import { Task } from "@/lib/types";
import { TaskController } from "./task-controller";

/**
 * Main entry point for the task execution system
 * This class is a facade that delegates to specialized components
 */
export class TaskExecutionEngine {
  /**
   * Start executing a task
   */
  public static async startTask(task: Task): Promise<boolean> {
    return TaskController.startTask(task);
  }

  /**
   * Stop executing a task
   */
  public static stopTask(taskId: string): boolean {
    return TaskController.stopTask(taskId);
  }
  
  /**
   * Cancel a task completely
   */
  public static cancelTask(taskId: string): boolean {
    return TaskController.cancelTask(taskId);
  }

  /**
   * Retry a failed task
   */
  public static async retryTask(taskId: string): Promise<boolean> {
    return TaskController.retryTask(taskId);
  }
  
  /**
   * Start multiple tasks at once
   */
  public static async startMultipleTasks(tasks: Task[]): Promise<number> {
    return TaskController.startMultipleTasks(tasks);
  }
  
  /**
   * Stop multiple tasks at once
   */
  public static stopMultipleTasks(taskIds: string[]): number {
    return TaskController.stopMultipleTasks(taskIds);
  }

  /**
   * Get the current execution state of a task
   */
  public static getTaskState(taskId: string) {
    return TaskController.getTaskState(taskId);
  }

  /**
   * Check if a task is currently running
   */
  public static isTaskRunning(taskId: string): boolean {
    return TaskController.isTaskRunning(taskId);
  }

  /**
   * Get the latest error for a task
   */
  public static getLastError(taskId: string) {
    return TaskController.getLastError(taskId);
  }
  
  /**
   * Get the execution logs for a task
   */
  public static getTaskLogs(taskId: string): string[] {
    return TaskController.getTaskLogs(taskId);
  }
  
  /**
   * Get the error logs for a task
   */
  public static getTaskErrorLogs(taskId: string): string[] {
    return TaskController.getTaskErrorLogs(taskId);
  }
}

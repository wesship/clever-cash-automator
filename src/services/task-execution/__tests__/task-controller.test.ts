
import { TaskController } from "../task-controller";
import { TaskStateManager } from "../task-state-manager";
import { TaskExecutor } from "../task-executor";
import { Task, TaskStatus, TaskType, PlatformType } from "@/lib/types";
import { toast } from "sonner";

// Mocks
jest.mock("../task-state-manager");
jest.mock("../task-executor");
jest.mock("sonner");

const mockTaskStateManager = TaskStateManager as jest.Mocked<typeof TaskStateManager>;
const mockTaskExecutor = TaskExecutor as jest.Mocked<typeof TaskExecutor>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe("TaskController", () => {
  const mockTask: Task = {
    id: "task-123",
    name: "Test Task",
    type: TaskType.VIDEO_WATCH,
    platform: PlatformType.YOUTUBE,
    status: TaskStatus.PENDING,
    createdAt: new Date(),
    completionCount: 0,
    targetCompletions: 5,
    earnings: 0,
    description: "Test task description",
    config: {
      proxyRequired: false,
      captchaHandling: false,
      notifyOnCompletion: true,
      notifyOnFailure: true
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    mockTaskStateManager.isTaskRunning.mockReturnValue(false);
    mockTaskStateManager.initializeTaskState.mockReturnValue({
      isRunning: true,
      progress: 0,
      currentStepDescription: "Initializing",
      logs: [],
      errors: [],
      startTime: new Date(),
      retryAttempts: 0
    });
    mockTaskExecutor.executeTaskInBackground.mockResolvedValue();
  });

  describe("startTask", () => {
    it("should successfully start a task", async () => {
      const result = await TaskController.startTask(mockTask);
      
      expect(result).toBe(true);
      expect(mockTaskStateManager.initializeTaskState).toHaveBeenCalledWith(mockTask.id);
      expect(mockTaskStateManager.logTaskProgress).toHaveBeenCalledWith(
        mockTask.id, 
        "Task execution started"
      );
      expect(mockTaskExecutor.executeTaskInBackground).toHaveBeenCalledWith(mockTask);
      expect(mockToast.success).toHaveBeenCalledWith(
        expect.stringContaining(`Started task "${mockTask.name}"`)
      );
    });

    it("should not start an already running task", async () => {
      mockTaskStateManager.isTaskRunning.mockReturnValue(true);
      
      const result = await TaskController.startTask(mockTask);
      
      expect(result).toBe(false);
      expect(mockTaskStateManager.initializeTaskState).not.toHaveBeenCalled();
      expect(mockToast.error).toHaveBeenCalledWith(
        expect.stringContaining(`Task "${mockTask.name}" is already running`)
      );
    });
  });

  describe("stopTask", () => {
    it("should successfully stop a task", () => {
      mockTaskStateManager.stopTask.mockReturnValue(true);
      
      const result = TaskController.stopTask(mockTask.id);
      
      expect(result).toBe(true);
      expect(mockTaskStateManager.stopTask).toHaveBeenCalledWith(mockTask.id);
      expect(mockTaskStateManager.logTaskProgress).toHaveBeenCalledWith(
        mockTask.id, 
        "Task execution stopped by user"
      );
      expect(mockToast.info).toHaveBeenCalledWith("Task paused successfully");
    });
  });
});

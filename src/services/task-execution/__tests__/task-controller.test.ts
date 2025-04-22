
import { TaskController } from "../task-controller";
import { TaskStateManager } from "../task-state-manager";
import { TaskExecutor } from "../task-executor";
import { Task, TaskStatus, TaskType, PlatformType, TaskPriority } from "@/lib/types";
import { toast } from "sonner";

// Mocks
jest.mock("../task-state-manager");
jest.mock("../task-executor");
jest.mock("sonner");

// Mock the static methods properly
const mockIsTaskRunning = jest.fn();
const mockInitializeTaskState = jest.fn();
const mockStopTask = jest.fn();
const mockLogTaskProgress = jest.fn();
const mockUpdateProgress = jest.fn();
const mockGetTaskState = jest.fn();
const mockPrepareForRetry = jest.fn();
const mockCancelTask = jest.fn();
const mockGetLastError = jest.fn();
const mockFinishTask = jest.fn();

// Set up mocked static methods
TaskStateManager.isTaskRunning = mockIsTaskRunning;
TaskStateManager.initializeTaskState = mockInitializeTaskState;
TaskStateManager.stopTask = mockStopTask;
TaskStateManager.logTaskProgress = mockLogTaskProgress;
TaskStateManager.updateProgress = mockUpdateProgress;
TaskStateManager.getTaskState = mockGetTaskState;
TaskStateManager.prepareForRetry = mockPrepareForRetry;
TaskStateManager.cancelTask = mockCancelTask;
TaskStateManager.getLastError = mockGetLastError;
TaskStateManager.finishTask = mockFinishTask;

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
    priority: TaskPriority.MEDIUM, // Add priority
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
    mockIsTaskRunning.mockReturnValue(false);
    mockInitializeTaskState.mockReturnValue({
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
      expect(mockInitializeTaskState).toHaveBeenCalledWith(mockTask.id);
      expect(mockLogTaskProgress).toHaveBeenCalledWith(
        mockTask.id, 
        "Task execution started"
      );
      expect(mockTaskExecutor.executeTaskInBackground).toHaveBeenCalledWith(mockTask);
      expect(mockToast.success).toHaveBeenCalledWith(
        expect.stringContaining(`Started task "${mockTask.name}"`)
      );
    });

    it("should not start an already running task", async () => {
      mockIsTaskRunning.mockReturnValue(true);
      
      const result = await TaskController.startTask(mockTask);
      
      expect(result).toBe(false);
      expect(mockInitializeTaskState).not.toHaveBeenCalled();
      expect(mockToast.error).toHaveBeenCalledWith(
        expect.stringContaining(`Task "${mockTask.name}" is already running`)
      );
    });
  });

  describe("stopTask", () => {
    it("should successfully stop a task", () => {
      mockStopTask.mockReturnValue(true);
      
      const result = TaskController.stopTask(mockTask.id);
      
      expect(result).toBe(true);
      expect(mockStopTask).toHaveBeenCalledWith(mockTask.id);
      expect(mockLogTaskProgress).toHaveBeenCalledWith(
        mockTask.id, 
        "Task execution stopped by user"
      );
      expect(mockToast.info).toHaveBeenCalledWith("Task paused successfully");
    });
  });
});

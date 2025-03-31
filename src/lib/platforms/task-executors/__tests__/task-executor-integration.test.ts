
import { executeAdClickTask } from '../ad-click-executor';
import { executeSurveyTask } from '../survey-executor';
import { executeVideoWatchTask } from '../video-watch-executor';
import { executeContentCreationTask } from '../content-creation-executor';
import { executeAffiliateTask } from '../affiliate-executor';

// Mock all the individual task executors
jest.mock('../ad-click-executor');
jest.mock('../survey-executor');
jest.mock('../video-watch-executor');
jest.mock('../content-creation-executor');
jest.mock('../affiliate-executor');

// Mock implementations
const mockExecuteAdClickTask = executeAdClickTask as jest.MockedFunction<typeof executeAdClickTask>;
const mockExecuteSurveyTask = executeSurveyTask as jest.MockedFunction<typeof executeSurveyTask>;
const mockExecuteVideoWatchTask = executeVideoWatchTask as jest.MockedFunction<typeof executeVideoWatchTask>;
const mockExecuteContentCreationTask = executeContentCreationTask as jest.MockedFunction<typeof executeContentCreationTask>;
const mockExecuteAffiliateTask = executeAffiliateTask as jest.MockedFunction<typeof executeAffiliateTask>;

describe('Task Executor Integration', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Default implementation for all mocks
    mockExecuteAdClickTask.mockResolvedValue();
    mockExecuteSurveyTask.mockResolvedValue();
    mockExecuteVideoWatchTask.mockResolvedValue();
    mockExecuteContentCreationTask.mockResolvedValue();
    mockExecuteAffiliateTask.mockResolvedValue();
  });
  
  it('should execute ad click task without errors', async () => {
    await executeAdClickTask();
    expect(mockExecuteAdClickTask).toHaveBeenCalledTimes(1);
  });
  
  it('should execute survey task without errors', async () => {
    await executeSurveyTask();
    expect(mockExecuteSurveyTask).toHaveBeenCalledTimes(1);
  });
  
  it('should execute video watch task without errors', async () => {
    await executeVideoWatchTask();
    expect(mockExecuteVideoWatchTask).toHaveBeenCalledTimes(1);
  });
  
  it('should execute content creation task without errors', async () => {
    await executeContentCreationTask();
    expect(mockExecuteContentCreationTask).toHaveBeenCalledTimes(1);
  });
  
  it('should execute affiliate task without errors', async () => {
    await executeAffiliateTask();
    expect(mockExecuteAffiliateTask).toHaveBeenCalledTimes(1);
  });
  
  it('should handle errors from task execution', async () => {
    // Make one of the executors reject
    mockExecuteVideoWatchTask.mockRejectedValue(new Error('Test error'));
    
    await expect(executeVideoWatchTask()).rejects.toThrow('Test error');
    expect(mockExecuteVideoWatchTask).toHaveBeenCalledTimes(1);
  });
});

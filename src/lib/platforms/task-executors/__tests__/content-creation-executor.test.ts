
import { executeContentCreationTask } from '../content-creation-executor';

// Mock the delay function to avoid waiting in tests
jest.mock('../utils', () => ({
  delay: jest.fn().mockResolvedValue(undefined)
}));

describe('Content Creation Task Executor', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute all steps of the content creation task', async () => {
    await executeContentCreationTask();
    
    // Verify console.log was called with each step
    expect(console.log).toHaveBeenCalledWith('Executing content creation task');
    expect(console.log).toHaveBeenCalledWith('Step: Initializing content generation module');
    expect(console.log).toHaveBeenCalledWith('Step: Analyzing task requirements');
    expect(console.log).toHaveBeenCalledWith('Step: Gathering source material');
    expect(console.log).toHaveBeenCalledWith('Step: Generating content outline');
    expect(console.log).toHaveBeenCalledWith('Step: Creating content draft');
    expect(console.log).toHaveBeenCalledWith('Step: Optimizing content');
    expect(console.log).toHaveBeenCalledWith('Step: Proofreading content');
    expect(console.log).toHaveBeenCalledWith('Step: Formatting output');
    expect(console.log).toHaveBeenCalledWith('Step: Submitting to platform');
    expect(console.log).toHaveBeenCalledWith('Step: Verifying submission');
  });
});


import { executeSurveyTask } from '../survey-executor';

// Mock the delay function to avoid waiting in tests
jest.mock('../utils', () => ({
  delay: jest.fn().mockResolvedValue(undefined)
}));

describe('Survey Task Executor', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute all steps of the survey task', async () => {
    await executeSurveyTask();
    
    // Verify console.log was called with each step
    expect(console.log).toHaveBeenCalledWith('Executing survey task');
    expect(console.log).toHaveBeenCalledWith('Step: Opening browser with configured user agent');
    expect(console.log).toHaveBeenCalledWith('Step: Loading survey platform');
    expect(console.log).toHaveBeenCalledWith('Step: Logging into account');
    expect(console.log).toHaveBeenCalledWith('Step: Scanning for available surveys');
    expect(console.log).toHaveBeenCalledWith('Step: Selecting appropriate survey');
    expect(console.log).toHaveBeenCalledWith('Step: Answering screening questions');
    expect(console.log).toHaveBeenCalledWith('Step: Processing survey questions');
    expect(console.log).toHaveBeenCalledWith('Step: Submitting survey responses');
    expect(console.log).toHaveBeenCalledWith('Step: Verifying completion credit');
  });
});

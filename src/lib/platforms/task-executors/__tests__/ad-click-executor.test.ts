
import { executeAdClickTask } from '../ad-click-executor';

// Mock the delay function to avoid waiting in tests
jest.mock('../utils', () => ({
  delay: jest.fn().mockResolvedValue(undefined)
}));

describe('Ad Click Task Executor', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute all steps of the ad click task', async () => {
    await executeAdClickTask();
    
    // Verify console.log was called with each step
    expect(console.log).toHaveBeenCalledWith('Executing ad click task');
    expect(console.log).toHaveBeenCalledWith('Step: Opening browser with configured user agent');
    expect(console.log).toHaveBeenCalledWith('Step: Connecting to proxy server');
    expect(console.log).toHaveBeenCalledWith('Step: Loading target platform');
    expect(console.log).toHaveBeenCalledWith('Step: Logging in to account');
    expect(console.log).toHaveBeenCalledWith('Step: Navigating to ads section');
    expect(console.log).toHaveBeenCalledWith('Step: Scanning for available ads');
    expect(console.log).toHaveBeenCalledWith('Step: Clicking on ad');
    expect(console.log).toHaveBeenCalledWith('Step: Waiting for page to load');
    expect(console.log).toHaveBeenCalledWith('Step: Verifying ad view counted');
    expect(console.log).toHaveBeenCalledWith('Step: Moving to next ad');
  });
});

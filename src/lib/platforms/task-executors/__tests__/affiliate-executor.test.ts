
import { executeAffiliateTask } from '../affiliate-executor';

// Mock the delay function to avoid waiting in tests
jest.mock('../utils', () => ({
  delay: jest.fn().mockResolvedValue(undefined)
}));

describe('Affiliate Task Executor', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute all steps of the affiliate task', async () => {
    await executeAffiliateTask();
    
    // Verify console.log was called with each step
    expect(console.log).toHaveBeenCalledWith('Executing affiliate task');
    expect(console.log).toHaveBeenCalledWith('Step: Initializing affiliate module');
    expect(console.log).toHaveBeenCalledWith('Step: Loading target platform');
    expect(console.log).toHaveBeenCalledWith('Step: Authenticating user account');
    expect(console.log).toHaveBeenCalledWith('Step: Identifying promotion opportunities');
    expect(console.log).toHaveBeenCalledWith('Step: Generating promotional content');
    expect(console.log).toHaveBeenCalledWith('Step: Inserting affiliate links');
    expect(console.log).toHaveBeenCalledWith('Step: Posting content to platform');
    expect(console.log).toHaveBeenCalledWith('Step: Verifying link functionality');
    expect(console.log).toHaveBeenCalledWith('Step: Monitoring initial engagement');
  });
});

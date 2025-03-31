
import { delay, withTimeout, formatLogMessage } from "../utils";

describe('Task Executor Utilities', () => {
  // Test the delay function
  describe('delay', () => {
    it('should resolve after the specified time', async () => {
      const start = Date.now();
      await delay(100);
      const elapsed = Date.now() - start;
      
      // Allow some flexibility in timing (at least 90ms)
      expect(elapsed).toBeGreaterThanOrEqual(90);
    });
  });
  
  // Test the withTimeout function
  describe('withTimeout', () => {
    it('should resolve if the function completes before timeout', async () => {
      const result = await withTimeout(
        async () => {
          await delay(50);
          return 'success';
        },
        200
      );
      
      expect(result).toBe('success');
    });
    
    it('should reject if the function times out', async () => {
      await expect(
        withTimeout(
          () => delay(300),
          100,
          'Custom timeout message'
        )
      ).rejects.toThrow('Custom timeout message');
    });
    
    it('should reject with the default message if none provided', async () => {
      await expect(
        withTimeout(
          () => delay(300),
          100
        )
      ).rejects.toThrow('Operation timed out');
    });
    
    it('should propagate errors from the execution function', async () => {
      await expect(
        withTimeout(
          async () => {
            await delay(50);
            throw new Error('Function error');
          },
          200
        )
      ).rejects.toThrow('Function error');
    });
  });
  
  // Test the formatLogMessage function
  describe('formatLogMessage', () => {
    it('should format a log message with timestamp', () => {
      const message = 'Test message';
      const formattedMessage = formatLogMessage(message);
      
      // Should match pattern [ISO timestamp] Message
      expect(formattedMessage).toMatch(/^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] Test message$/);
    });
    
    it('should handle empty messages', () => {
      const formattedMessage = formatLogMessage('');
      expect(formattedMessage).toMatch(/^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] $/);
    });
  });
});

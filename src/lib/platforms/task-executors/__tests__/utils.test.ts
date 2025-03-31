
import { delay, withTimeout } from "../utils";

describe('Task Executor Utilities', () => {
  describe('delay function', () => {
    it('should delay execution for the specified time', async () => {
      const start = Date.now();
      await delay(100);
      const elapsed = Date.now() - start;
      
      // Allow some flexibility in timing (between 80ms and 150ms)
      expect(elapsed).toBeGreaterThanOrEqual(80);
      expect(elapsed).toBeLessThan(150);
    });
  });
  
  describe('withTimeout function', () => {
    it('should resolve when the function completes before timeout', async () => {
      const result = await withTimeout(
        () => Promise.resolve('success'),
        1000
      );
      
      expect(result).toBe('success');
    });
    
    it('should reject with timeout error when function takes too long', async () => {
      await expect(
        withTimeout(
          () => delay(200),
          100,
          'Custom timeout message'
        )
      ).rejects.toThrow('Custom timeout message');
    });
    
    it('should pass through errors from the original function', async () => {
      await expect(
        withTimeout(
          () => Promise.reject(new Error('Original error')),
          1000
        )
      ).rejects.toThrow('Original error');
    });
  });
  
  describe('formatLogMessage function', () => {
    it('should format a message with a timestamp', () => {
      const message = "Test message";
      const formattedMessage = require('../utils').formatLogMessage(message);
      
      // Check if the formatted message includes the original message
      expect(formattedMessage).toContain(message);
      
      // Check if it has a timestamp format [YYYY-MM-DDThh:mm:ss.sssZ]
      expect(formattedMessage).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\] Test message/);
    });
  });
});

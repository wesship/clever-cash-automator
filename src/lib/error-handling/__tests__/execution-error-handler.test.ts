
import { ExecutionErrorHandler } from '../execution-error-handler';
import { ErrorType } from '../types';

describe('ExecutionErrorHandler', () => {
  const platformId = 'test-platform';

  describe('classifyError', () => {
    it('should classify network errors correctly', () => {
      const networkErrors = [
        new Error('Network connection failed'),
        new Error('Connection timeout occurred'),
        new Error('Socket connection refused'),
        new Error('DNS resolution failed'),
        new Error('Proxy connection error')
      ];

      networkErrors.forEach(error => {
        const result = ExecutionErrorHandler.classifyError(error, platformId);
        expect(result.type).toBe(ErrorType.NETWORK);
        expect(result.recoverable).toBe(true);
      });
    });

    it('should classify authentication errors correctly', () => {
      const authErrors = [
        new Error('Authentication failed'),
        new Error('Invalid login credentials'),
        new Error('Unauthorized access: 401'),
        new Error('Token expired or invalid')
      ];

      authErrors.forEach(error => {
        const result = ExecutionErrorHandler.classifyError(error, platformId);
        expect(result.type).toBe(ErrorType.AUTHENTICATION);
        expect(result.recoverable).toBe(false);
      });
    });

    it('should classify rate limit errors correctly', () => {
      const rateLimitErrors = [
        new Error('Rate limit exceeded'),
        new Error('Too many requests: 429'),
        new Error('API quota reached'),
        new Error('Request throttled by server')
      ];

      rateLimitErrors.forEach(error => {
        const result = ExecutionErrorHandler.classifyError(error, platformId);
        expect(result.type).toBe(ErrorType.RATE_LIMIT);
        expect(result.recoverable).toBe(true);
      });
    });

    it('should classify platform availability errors correctly', () => {
      const availabilityErrors = [
        new Error('Service unavailable: 503'),
        new Error('Platform is down for maintenance'),
        new Error('Server overloaded'),
        new Error('Bad gateway: 502')
      ];

      availabilityErrors.forEach(error => {
        const result = ExecutionErrorHandler.classifyError(error, platformId);
        expect(result.type).toBe(ErrorType.PLATFORM_UNAVAILABLE);
        expect(result.recoverable).toBe(true);
      });
    });

    it('should classify captcha and verification errors correctly', () => {
      const captchaErrors = [
        new Error('Captcha challenge detected'),
        new Error('Human verification required'),
        new Error('Please prove you are not a robot')
      ];

      captchaErrors.forEach(error => {
        const result = ExecutionErrorHandler.classifyError(error, platformId);
        expect(result.type).toBe(ErrorType.VALIDATION);
        expect(result.recoverable).toBe(true);
      });
    });

    it('should classify unknown errors correctly', () => {
      const unknownError = new Error('Some unexpected error occurred');
      const result = ExecutionErrorHandler.classifyError(unknownError, platformId);
      expect(result.type).toBe(ErrorType.UNKNOWN);
      expect(result.recoverable).toBe(false);
    });

    it('should handle non-Error objects', () => {
      const nonErrors = [
        'String error message',
        123,
        { message: 'Error object' },
        null,
        undefined
      ];

      nonErrors.forEach(error => {
        const result = ExecutionErrorHandler.classifyError(error, platformId);
        expect(result.type).toBeDefined();
        expect(typeof result.message).toBe('string');
        expect(typeof result.recoverable).toBe('boolean');
      });
    });
  });

  describe('createPlatformError', () => {
    it('should create a PlatformError with the correct properties', () => {
      const error = new Error('Test error');
      const platformError = ExecutionErrorHandler.createPlatformError(error, platformId);
      
      expect(platformError.message).toContain('Test error');
      expect(platformError.platformId).toBe(platformId);
      expect(platformError.cause).toBe(error);
    });

    it('should preserve error classification in the created PlatformError', () => {
      const networkError = new Error('Network connection failed');
      const platformError = ExecutionErrorHandler.createPlatformError(networkError, platformId);
      
      expect(platformError.type).toBe(ErrorType.NETWORK);
      expect(platformError.recoverable).toBe(true);
      expect(platformError.details).toHaveProperty('suggestion');
    });
  });
});

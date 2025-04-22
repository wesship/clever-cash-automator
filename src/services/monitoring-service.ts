
import { ErrorService } from './error-service';
import { initPerformanceMonitoring } from '@/utils/performance-monitoring';
import { ENV } from '@/config/environment';

export class MonitoringService {
  static initialize() {
    // Initialize error tracking
    if (ENV.ERROR_TRACKING.ENABLED) {
      initPerformanceMonitoring();
      console.log('Error tracking initialized');
    }

    // Initialize analytics
    if (ENV.ANALYTICS.ENABLED) {
      console.log('Analytics initialized');
    }

    // Test error tracking
    if (ENV.DEVELOPMENT) {
      ErrorService.trackEvent('app_initialized', {
        timestamp: new Date().toISOString(),
        environment: ENV.PRODUCTION ? 'production' : 'development'
      });
    }
  }

  static testErrorTracking() {
    if (ENV.DEVELOPMENT) {
      try {
        throw new Error('Test error - Monitoring service check');
      } catch (error) {
        if (error instanceof Error) {
          ErrorService.log(error, { context: 'monitoring_test' });
        }
      }
    }
  }
}

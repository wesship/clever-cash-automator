
import * as Sentry from "@sentry/react";
import React from 'react';
import { ENV } from "@/config/environment";

export const initPerformanceMonitoring = () => {
  if (ENV.PRODUCTION && ENV.ERROR_TRACKING.ENABLED) {
    Sentry.init({
      dsn: ENV.ERROR_TRACKING.DSN,
      integrations: [new Sentry.BrowserTracing()],
      tracesSampleRate: 0.2,
      profilesSampleRate: 0.5,
      environment: ENV.PRODUCTION ? 'production' : 'development'
    });
  }
};

// Code splitting example
export const lazyLoadComponent = (importFn: () => Promise<any>) => {
  return React.lazy(() => {
    return importFn().catch(error => {
      Sentry.captureException(error);
      throw error;
    });
  });
};

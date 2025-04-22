
import * as Sentry from "@sentry/react";
import { ENV } from "@/config/environment";

export class ErrorService {
  static log(error: Error, context?: Record<string, any>) {
    if (ENV.PRODUCTION) {
      Sentry.captureException(error, { extra: context });
    } else {
      console.error("Error:", error, context);
    }
  }

  static trackEvent(eventName: string, properties?: Record<string, any>) {
    if (ENV.ANALYTICS.ENABLED) {
      // Integrate with your analytics provider
    }
  }
}

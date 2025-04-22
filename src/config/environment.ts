
type Environment = {
  PRODUCTION: boolean;
  DEVELOPMENT: boolean;
  API_BASE_URL: string;
  ERROR_TRACKING: {
    ENABLED: boolean;
    DSN: string | null;
  };
  ANALYTICS: {
    ENABLED: boolean;
    TRACKING_ID: string | null;
  };
};

// Default values for environment variables
const defaults = {
  API_BASE_URL: 'https://api.clevercash.com',
  ERROR_TRACKING: {
    ENABLED: false,
    DSN: null,
  },
  ANALYTICS: {
    ENABLED: false,
    TRACKING_ID: null,
  },
};

// Helper to parse boolean environment variables
const parseBooleanEnv = (value: string | undefined): boolean => {
  return value?.toLowerCase() === 'true';
};

// Helper to parse string environment variables with a default
const parseStringEnv = (value: string | undefined, defaultValue: string): string => {
  return value || defaultValue;
};

export const ENV: Environment = {
  PRODUCTION: import.meta.env.PROD,
  DEVELOPMENT: import.meta.env.DEV,
  API_BASE_URL: parseStringEnv(import.meta.env.VITE_API_BASE_URL, defaults.API_BASE_URL),
  ERROR_TRACKING: {
    ENABLED: parseBooleanEnv(import.meta.env.VITE_ERROR_TRACKING),
    DSN: import.meta.env.VITE_SENTRY_DSN || defaults.ERROR_TRACKING.DSN,
  },
  ANALYTICS: {
    ENABLED: parseBooleanEnv(import.meta.env.VITE_ANALYTICS),
    TRACKING_ID: import.meta.env.VITE_ANALYTICS_ID || defaults.ANALYTICS.TRACKING_ID,
  },
};

// Validate required environment variables in production
if (ENV.PRODUCTION) {
  if (ENV.ERROR_TRACKING.ENABLED && !ENV.ERROR_TRACKING.DSN) {
    console.error('Error tracking is enabled but no DSN is provided');
  }
  
  if (ENV.ANALYTICS.ENABLED && !ENV.ANALYTICS.TRACKING_ID) {
    console.error('Analytics is enabled but no tracking ID is provided');
  }
}


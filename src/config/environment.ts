
export const ENV = {
  PRODUCTION: import.meta.env.PROD,
  DEVELOPMENT: import.meta.env.DEV,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.clevercash.com',
  ERROR_TRACKING: {
    ENABLED: import.meta.env.VITE_ERROR_TRACKING === 'true',
    DSN: import.meta.env.VITE_SENTRY_DSN
  },
  ANALYTICS: {
    ENABLED: import.meta.env.VITE_ANALYTICS === 'true',
    TRACKING_ID: import.meta.env.VITE_ANALYTICS_ID
  }
};

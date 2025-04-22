
/**
 * Extract timestamp from formatted log message
 * @param logMessage Log message with timestamp
 * @returns Extracted timestamp or null
 */
export const extractTimestamp = (logMessage: string): Date | null => {
  const match = logMessage.match(/^\[(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)\]/);
  if (match && match[1]) {
    return new Date(match[1]);
  }
  return null;
};

/**
 * Get abbreviated log message for display
 * @param message The original log message
 * @param maxLength Maximum allowed length
 * @returns Abbreviated log message
 */
export const abbreviateLogMessage = (message: string, maxLength: number = 100): string => {
  if (message.length <= maxLength) return message;
  
  const breakPoint = message.lastIndexOf(' ', maxLength - 3);
  if (breakPoint > maxLength * 0.7) {
    return message.substring(0, breakPoint) + '...';
  }
  
  return message.substring(0, maxLength - 3) + '...';
};

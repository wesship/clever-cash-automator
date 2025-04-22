
import { PlatformError } from "../platform-error";

export class RecoverySuggestions {
  static getRecoverySteps(error: PlatformError): string[] {
    const steps: string[] = [];
    
    switch (error.code) {
      case "AUTH_ERROR":
        steps.push("Check your account credentials");
        steps.push("Ensure your account is not locked");
        steps.push("Try logging out and logging back in");
        break;
        
      case "NETWORK_ERROR":
        steps.push("Check your internet connection");
        steps.push("Ensure your proxy settings are correct (if used)");
        steps.push("Try again in a few minutes");
        break;
        
      case "TIMEOUT_ERROR":
        steps.push("The operation timed out, try again");
        steps.push("Consider increasing timeout settings");
        steps.push("Check if the platform is experiencing high load");
        break;
        
      case "RATE_LIMIT_ERROR":
        steps.push("You've reached a rate limit, wait before trying again");
        steps.push("Consider reducing concurrent task execution");
        steps.push("Distribute tasks across more accounts if available");
        break;
        
      case "VALIDATION_ERROR":
        steps.push("Check the task parameters for errors");
        steps.push("Ensure all required fields are provided");
        steps.push("Verify that values are within allowed ranges");
        break;
        
      default:
        steps.push("Try the operation again");
        steps.push("Check task configuration for errors");
        steps.push("Contact support if the issue persists");
        break;
    }
    
    return steps;
  }
}

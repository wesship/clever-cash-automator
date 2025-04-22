
import { PlatformError } from "../platform-error";
import { toast } from "sonner";

export class ErrorNotifier {
  static showErrorNotification(error: PlatformError): void {
    if (error.recoverable) {
      toast.error(`${error.getUserFriendlyMessage()} ${error.getRecoverySuggestion()}`);
    } else {
      toast.error(error.getUserFriendlyMessage());
    }
  }

  static logErrorToServer(error: PlatformError): void {
    // In a real app, this would send the error to a server
    console.log("Logging error to server:", error);
  }
}

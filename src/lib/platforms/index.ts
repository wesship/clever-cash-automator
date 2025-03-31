
import { PlatformType } from "@/lib/types";
import { PlatformRegistry } from "./types";
import { NeobuxAdapter } from "./neobux.adapter";
import { ClickworkerAdapter } from "./clickworker.adapter";
import { MTurkAdapter } from "./mturk.adapter";
import { BaseAdapter } from "./base.adapter";

// Initialize and register all platform adapters
export function initializePlatformAdapters() {
  // Register the Neobux adapter
  PlatformRegistry.register(PlatformType.NEOBUX, new NeobuxAdapter());
  
  // Register the Clickworker adapter
  PlatformRegistry.register(PlatformType.CLICKWORKER, new ClickworkerAdapter());
  
  // Register the Amazon Mechanical Turk adapter
  PlatformRegistry.register(PlatformType.AMAZON_MECHANICAL_TURK, new MTurkAdapter());
  
  // You can register more adapters for other platforms here
}

// Get the adapter for a specific platform, falling back to the base adapter
export function getPlatformAdapter(platform: string) {
  if (!platform) return new BaseAdapter();
  
  const platformType = platform as PlatformType;
  return PlatformRegistry.getAdapter(platformType) || new BaseAdapter();
}

// Export for direct imports
export { PlatformRegistry } from "./types";
export { NeobuxAdapter } from "./neobux.adapter";
export { ClickworkerAdapter } from "./clickworker.adapter";
export { MTurkAdapter } from "./mturk.adapter";
export { BaseAdapter } from "./base.adapter";
export type { NeobuxAdType } from "./neobux.adapter";
export { neobuxAdTypeEnum } from "./neobux.adapter";

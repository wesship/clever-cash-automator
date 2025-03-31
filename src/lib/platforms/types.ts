
import { z } from "zod";
import { Task, PlatformType } from "@/lib/types";

// Base interface for platform adapters
export interface PlatformAdapter {
  getTaskSchema(): z.ZodTypeAny;
  getDefaultValues(): Record<string, any>;
  executeTask(task: Task): Promise<void>;
  getFormFields(form: any): JSX.Element | null;
}

// Registry for platform adapters
export class PlatformRegistry {
  private static adapters: Map<PlatformType, PlatformAdapter> = new Map();

  static register(platform: PlatformType, adapter: PlatformAdapter): void {
    this.adapters.set(platform, adapter);
  }

  static getAdapter(platform: PlatformType): PlatformAdapter | undefined {
    return this.adapters.get(platform);
  }

  static hasAdapter(platform: PlatformType): boolean {
    return this.adapters.has(platform);
  }

  static getAllAdapters(): Map<PlatformType, PlatformAdapter> {
    return this.adapters;
  }
}

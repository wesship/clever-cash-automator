
import { Account, Task } from "@/types/account.types";

/**
 * Returns the appropriate Tailwind CSS class for a given status
 */
export const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-vibrant-green text-white";
    case "paused": return "bg-vibrant-yellow text-white";
    case "inactive": return "bg-secondary text-secondary-foreground";
    default: return "bg-destructive text-destructive-foreground";
  }
};

/**
 * Generates mock data for an account
 */
export const generateMockAccountData = (id: string): Account => {
  return {
    id: id || "",
    platform: "Swagbucks",
    username: "user1234",
    status: "active",
    lastUsed: new Date(Date.now() - 3600000 * 2),
    proxyEnabled: true,
    earnings: 45.20,
    taskCount: 4,
    createdAt: new Date(Date.now() - 86400000 * 30),
    email: "user1234@example.com",
    proxy: {
      name: "US Residential",
      location: "United States",
      ip: "192.168.1.1",
      lastRotated: new Date(Date.now() - 86400000)
    },
    tasks: [
      { id: "1", name: "Ad Clicks", status: "active", earnings: 15.20, completions: 42, total: 100 },
      { id: "2", name: "Surveys", status: "active", earnings: 8.50, completions: 3, total: 10 },
      { id: "3", name: "Video Watching", status: "paused", earnings: 12.30, completions: 18, total: 50 },
      { id: "4", name: "Referrals", status: "active", earnings: 9.20, completions: 2, total: 20 }
    ],
    earningsData: {
      daily: [2.30, 3.50, 1.20, 4.80, 3.90, 5.10, 3.20],
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    performanceMetrics: {
      successRate: 92,
      averageTaskTime: "3m 42s",
      dailyActiveTime: "2h 15m",
      captchaSuccessRate: 88
    }
  };
};

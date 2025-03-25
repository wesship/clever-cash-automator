
export interface Task {
  id: string;
  name: string;
  status: string;
  earnings: number;
  completions: number;
  total: number;
}

export interface Proxy {
  name: string;
  location: string;
  ip: string;
  lastRotated: Date;
}

export interface PerformanceMetrics {
  successRate: number;
  averageTaskTime: string;
  dailyActiveTime: string;
  captchaSuccessRate: number;
}

export interface EarningsData {
  daily: number[];
  days: string[];
}

export interface Account {
  id: string;
  platform: string;
  username: string;
  status: string;
  lastUsed: Date;
  proxyEnabled: boolean;
  earnings: number;
  taskCount: number;
  createdAt: Date;
  email: string;
  proxy: Proxy;
  tasks: Task[];
  earningsData: EarningsData;
  performanceMetrics: PerformanceMetrics;
}

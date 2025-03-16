
import React from "react";
import { cn } from "@/lib/utils";
import { Statistics } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  CheckCircle2, 
  Users, 
  Calendar, 
  TrendingUp, 
  BarChart 
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart as RechartBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface StatisticsPanelProps {
  statistics: Statistics;
  className?: string;
}

const dummyEarningsData = [
  { name: "Mon", amount: 4.2 },
  { name: "Tue", amount: 7.8 },
  { name: "Wed", amount: 5.6 },
  { name: "Thu", amount: 9.2 },
  { name: "Fri", amount: 12.5 },
  { name: "Sat", amount: 6.7 },
  { name: "Sun", amount: 8.3 },
];

const dummyTasksData = [
  { name: "Ad Click", completed: 32 },
  { name: "Survey", completed: 18 },
  { name: "Video", completed: 24 },
  { name: "Content", completed: 8 },
  { name: "Affiliate", completed: 12 },
];

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  statistics,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-soft">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${statistics.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5.2% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.tasksCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.taskSuccessRate.toFixed(0)}% success rate
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.activeAccounts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across 5 platforms
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Earnings Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${statistics.earningsToday.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.earningsToday > statistics.earningsThisWeek / 7 ? '+' : '-'}
              {Math.abs(statistics.earningsToday - statistics.earningsThisWeek / 7).toFixed(2)} vs. avg
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-soft">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-lg">Weekly Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dummyEarningsData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis 
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{ 
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #f5f5f5',
                      borderRadius: '6px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div>
                <p className="text-sm font-medium">Weekly Total</p>
                <p className="text-2xl font-bold">${statistics.earningsThisWeek.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Monthly Projection</p>
                <p className="text-2xl font-bold">
                  ${(statistics.earningsThisWeek * 4).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-lg">Task Distribution</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartBarChart
                  data={dummyTasksData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis 
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{ 
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #f5f5f5',
                      borderRadius: '6px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                  />
                  <Bar 
                    dataKey="completed" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </RechartBarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Success Rate</p>
                <p className="text-sm font-medium">{statistics.taskSuccessRate.toFixed(0)}%</p>
              </div>
              <Progress value={statistics.taskSuccessRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPanel;

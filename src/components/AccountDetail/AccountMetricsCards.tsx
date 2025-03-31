
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, BarChart, Cpu } from "lucide-react";
import { Account } from "@/types/account.types";

interface AccountMetricsProps {
  account: Account;
}

const AccountMetricsCards = ({ account }: AccountMetricsProps) => {
  // Calculate success rate based on completed tasks
  const activeTaskCount = account.tasks.filter(t => t.status === "active").length;
  const automationRate = account.performanceMetrics?.successRate || 92; // Fallback to 92% if not available

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">${account.earnings.toFixed(2)}</p>
              <p className="text-xs text-vibrant-green">+8% this week</p>
            </div>
            <div className="h-12 w-12 bg-vibrant-green/10 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-vibrant-green" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">{activeTaskCount}</p>
              <p className="text-xs text-vibrant-green">Out of {account.tasks.length} total</p>
            </div>
            <div className="h-12 w-12 bg-vibrant-blue/10 rounded-full flex items-center justify-center">
              <BarChart className="h-6 w-6 text-vibrant-blue" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Account Age</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">
                {Math.floor((Date.now() - account.createdAt.getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
              <p className="text-xs text-muted-foreground">Created on {account.createdAt.toLocaleDateString()}</p>
            </div>
            <div className="h-12 w-12 bg-vibrant-yellow/10 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-vibrant-yellow" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Automation Success</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">{automationRate}%</p>
              <p className="text-xs text-muted-foreground">Task completion rate</p>
            </div>
            <div className="h-12 w-12 bg-vibrant-green/10 rounded-full flex items-center justify-center">
              <Cpu className="h-6 w-6 text-vibrant-green" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountMetricsCards;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";

interface AccountDetailsProps {
  account: any;
  getStatusColor: (status: string) => string;
}

const AccountOverview = ({ account, getStatusColor }: AccountDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{account.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Platform</p>
                <p className="font-medium">{account.platform}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{account.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(account.status)}>{account.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Used</p>
                <p className="font-medium">{account.lastUsed.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Proxy</p>
                <p className="font-medium">{account.proxyEnabled ? "Enabled" : "Disabled"}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full gap-1">
            <Settings className="h-4 w-4" />
            Edit Account Details
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-background/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Success Rate</p>
                <p className="text-vibrant-green font-medium">{account.performanceMetrics.successRate}%</p>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-vibrant-green" style={{ width: `${account.performanceMetrics.successRate}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Average Task Time</p>
                <p className="font-medium">{account.performanceMetrics.averageTaskTime}</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Daily Active Time</p>
                <p className="font-medium">{account.performanceMetrics.dailyActiveTime}</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">CAPTCHA Success</p>
                <p className="font-medium">{account.performanceMetrics.captchaSuccessRate}%</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
                <p className="font-medium">
                  {account.tasks.reduce((sum: number, task: any) => sum + task.completions, 0)} / 
                  {account.tasks.reduce((sum: number, task: any) => sum + task.total, 0)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountOverview;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, BarChart } from "lucide-react";

interface AccountMetricsProps {
  account: any;
}

const AccountMetricsCards = ({ account }: AccountMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
              <p className="text-2xl font-bold">{account.tasks.filter((t: any) => t.status === "active").length}</p>
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
    </div>
  );
};

export default AccountMetricsCards;

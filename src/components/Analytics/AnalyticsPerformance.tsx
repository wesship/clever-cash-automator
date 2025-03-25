
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsPerformance = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Top Performing Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Swagbucks Ad Clicks", "Fiverr Order Management", "Affiliate Link Posting"].map((task, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-background/50 rounded-md">
                <div>
                  <p className="font-medium">{task}</p>
                  <p className="text-xs text-muted-foreground">
                    {["42/100 completions", "12/25 completions", "5/40 completions"][index]}
                  </p>
                </div>
                <p className="text-vibrant-green font-medium">
                  ${[12.50, 45.60, 32.20][index].toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Earnings Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-background/50 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">This Month</p>
                <p className="text-vibrant-green font-medium">$145.80</p>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-vibrant-green" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">75% of previous month</p>
            </div>

            <div className="p-4 bg-background/50 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">This Year</p>
                <p className="text-vibrant-green font-medium">$1,450.00</p>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-vibrant-blue" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Projected based on current growth rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPerformance;

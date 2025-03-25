
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Calendar } from "lucide-react";

interface AnalyticsCardsProps {
  period: "day" | "week" | "month" | "year";
  earningsData: {
    day: { amount: number, change: string };
    week: { amount: number, change: string };
    month: { amount: number, change: string };
    year: { amount: number, change: string };
  };
}

const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ period, earningsData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">${earningsData[period].amount}</p>
              <p className="text-xs text-vibrant-green">{earningsData[period].change} from previous {period}</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
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
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-vibrant-green">+2 from previous {period}</p>
            </div>
            <div className="h-12 w-12 bg-vibrant-blue/10 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-vibrant-blue" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-vibrant-yellow">±0 from previous {period}</p>
            </div>
            <div className="h-12 w-12 bg-vibrant-yellow/10 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-vibrant-yellow" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Period</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">32 days</p>
              <p className="text-xs text-vibrant-green">+5 days from previous period</p>
            </div>
            <div className="h-12 w-12 bg-vibrant-green/10 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-vibrant-green" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCards;

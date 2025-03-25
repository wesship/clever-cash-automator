
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, PieChart, LineChart, ExternalLink } from "lucide-react";

const AnalyticsTabs = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <Tabs defaultValue="earnings" className="space-y-4">
        <TabsList className="bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="earnings" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
            <LineChart className="h-4 w-4 mr-2" />
            Earnings
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
            <BarChart className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="platforms" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
            <PieChart className="h-4 w-4 mr-2" />
            Platforms
          </TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Earnings Over Time</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => navigate('/analytics/earnings')}
              >
                <ExternalLink className="h-4 w-4" />
                Detailed View
              </Button>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-center text-muted-foreground">
                Earnings chart would go here with temporal data visualization
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Task Performance</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => navigate('/analytics/tasks')}
              >
                <ExternalLink className="h-4 w-4" />
                Detailed View
              </Button>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-center text-muted-foreground">
                Task performance chart would go here with completion rate data
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Earnings by Platform</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => navigate('/analytics/platforms')}
              >
                <ExternalLink className="h-4 w-4" />
                Detailed View
              </Button>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-center text-muted-foreground">
                Platform distribution chart would go here showing earnings by platform
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsTabs;

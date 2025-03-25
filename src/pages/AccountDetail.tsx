
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShieldCheck, BarChart } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Background3D from "@/components/ui/3d-background";
import AccountHeader from "@/components/AccountDetail/AccountHeader";
import AccountMetricsCards from "@/components/AccountDetail/AccountMetricsCards";
import AccountOverview from "@/components/AccountDetail/AccountOverview";
import AccountTasks from "@/components/AccountDetail/AccountTasks";
import AccountProxy from "@/components/AccountDetail/AccountProxy";
import { Account } from "@/types/account.types";

const AccountDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the selected account
  const accountData: Account = {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-vibrant-green text-white";
      case "paused": return "bg-vibrant-yellow text-white";
      case "inactive": return "bg-secondary text-secondary-foreground";
      default: return "bg-destructive text-destructive-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <AccountHeader account={accountData} getStatusColor={getStatusColor} />
          <AccountMetricsCards account={accountData} />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <BarChart className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="proxy" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Proxy Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 animate-fade-in">
              <AccountOverview account={accountData} getStatusColor={getStatusColor} />
            </TabsContent>

            <TabsContent value="tasks" className="animate-fade-in">
              <AccountTasks tasks={accountData.tasks} getStatusColor={getStatusColor} />
            </TabsContent>

            <TabsContent value="proxy" className="animate-fade-in">
              <AccountProxy account={accountData} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountDetail;

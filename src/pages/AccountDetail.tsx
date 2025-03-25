
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
import { getStatusColor, generateMockAccountData } from "@/utils/account-utils";

const AccountDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Use the utility function to generate mock data
  const accountData: Account = generateMockAccountData(id || "");

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

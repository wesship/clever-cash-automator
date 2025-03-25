
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShieldCheck } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Background3D from "@/components/ui/3d-background";
import AccountsHeader from "@/components/Accounts/AccountsHeader";
import AccountsList from "@/components/Accounts/AccountsList";
import ProxiesList from "@/components/Accounts/ProxiesList";

// Mock data for accounts
const mockAccounts = [
  {
    id: "1",
    platform: "Swagbucks",
    username: "user1234",
    status: "active",
    lastUsed: new Date(Date.now() - 3600000 * 2),
    proxyEnabled: true,
    earnings: 45.20,
    taskCount: 2
  },
  {
    id: "2",
    platform: "MTurk",
    username: "worker5678",
    status: "inactive",
    lastUsed: new Date(Date.now() - 86400000 * 2),
    proxyEnabled: false,
    earnings: 28.75,
    taskCount: 1
  },
  {
    id: "3",
    platform: "Fiverr",
    username: "creativepro",
    status: "active",
    lastUsed: new Date(Date.now() - 3600000 * 5),
    proxyEnabled: false,
    earnings: 78.50,
    taskCount: 1
  },
  {
    id: "4",
    platform: "YouTube",
    username: "viewchannel",
    status: "active",
    lastUsed: new Date(Date.now() - 86400000),
    proxyEnabled: true,
    earnings: 12.60,
    taskCount: 1
  },
  {
    id: "5",
    platform: "Upwork",
    username: "freelancer99",
    status: "suspended",
    lastUsed: new Date(Date.now() - 86400000 * 5),
    proxyEnabled: true,
    earnings: 0,
    taskCount: 1
  }
];

// Mock data for proxies
const mockProxies = [
  {
    id: "1",
    name: "US Residential",
    location: "United States",
    status: "active",
    type: "Residential",
    ipCount: 25,
    usedBy: 2
  },
  {
    id: "2",
    name: "EU Server",
    location: "Germany",
    status: "active",
    type: "Datacenter",
    ipCount: 10,
    usedBy: 1
  },
  {
    id: "3",
    name: "Asia Pacific",
    location: "Singapore",
    status: "inactive",
    type: "Residential",
    ipCount: 15,
    usedBy: 0
  }
];

const Accounts = () => {
  const [activeTab, setActiveTab] = useState("accounts");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <AccountsHeader />

          <Tabs defaultValue="accounts" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="accounts" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                Accounts
              </TabsTrigger>
              <TabsTrigger value="proxies" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Proxies
              </TabsTrigger>
            </TabsList>

            <TabsContent value="accounts" className="space-y-4 animate-fade-in">
              <AccountsList accounts={mockAccounts} />
            </TabsContent>

            <TabsContent value="proxies" className="space-y-4 animate-fade-in">
              <ProxiesList proxies={mockProxies} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accounts;

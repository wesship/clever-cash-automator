
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShieldCheck } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Background3D from "@/components/ui/3d-background";
import AccountsHeader from "@/components/Accounts/AccountsHeader";
import AccountsList from "@/components/Accounts/AccountsList";
import ProxiesList from "@/components/Accounts/ProxiesList";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AccountForm from "@/components/Accounts/AccountForm";
import ProxyForm from "@/components/Accounts/ProxyForm";
import { toast } from "sonner";

// Mock data for accounts
const initialAccounts = [
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
const initialProxies = [
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
  const [accounts, setAccounts] = useState(initialAccounts);
  const [proxies, setProxies] = useState(initialProxies);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<"account" | "proxy">("account");

  const handleCreateAccount = (newAccount: any) => {
    setAccounts([...accounts, newAccount]);
    setIsDialogOpen(false);
  };

  const handleCreateProxy = (newProxy: any) => {
    setProxies([...proxies, newProxy]);
    setIsDialogOpen(false);
  };

  const handleAddNew = () => {
    setDialogContent(activeTab === "accounts" ? "account" : "proxy");
    setIsDialogOpen(true);
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
    toast.success("Account deleted successfully");
  };

  const handleDeleteProxy = (proxyId: string) => {
    setProxies(proxies.filter(proxy => proxy.id !== proxyId));
    toast.success("Proxy deleted successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <AccountsHeader onAddNew={handleAddNew} />

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
              <AccountsList accounts={accounts} onDelete={handleDeleteAccount} />
            </TabsContent>

            <TabsContent value="proxies" className="space-y-4 animate-fade-in">
              <ProxiesList proxies={proxies} onDelete={handleDeleteProxy} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogContent === "account" ? "Add New Account" : "Add New Proxy"}
            </DialogTitle>
          </DialogHeader>
          {dialogContent === "account" ? (
            <AccountForm 
              onSubmit={handleCreateAccount} 
              onCancel={() => setIsDialogOpen(false)} 
            />
          ) : (
            <ProxyForm 
              onSubmit={handleCreateProxy} 
              onCancel={() => setIsDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Accounts;


import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wifi, Bell, Shield, User, Settings as SettingsIcon, BookOpen } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Background3D from "@/components/ui/3d-background";
import AppearanceSettings from "@/components/Settings/AppearanceSettings";
import NotificationSettings from "@/components/Settings/NotificationSettings";
import SecuritySettings from "@/components/Settings/SecuritySettings";
import NetworkSettings from "@/components/Settings/NetworkSettings";
import AdvancedSettings from "@/components/Settings/AdvancedSettings";
import AccountSettings from "@/components/Settings/AccountSettings";
import KnowledgeBase from "@/components/Settings/KnowledgeBase";

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-gradient">Settings</span>
            </h1>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="account" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="general" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <SettingsIcon className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="network" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <Wifi className="h-4 w-4 mr-2" />
                Network
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <BookOpen className="h-4 w-4 mr-2" />
                Knowledge Base
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6 animate-fade-in">
              <AccountSettings />
            </TabsContent>

            <TabsContent value="general" className="space-y-6 animate-fade-in">
              <AppearanceSettings />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 animate-fade-in">
              <NotificationSettings />
            </TabsContent>

            <TabsContent value="security" className="space-y-6 animate-fade-in">
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="network" className="space-y-6 animate-fade-in">
              <NetworkSettings />
              <AdvancedSettings />
            </TabsContent>
            
            <TabsContent value="knowledge" className="space-y-6 animate-fade-in">
              <KnowledgeBase />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;

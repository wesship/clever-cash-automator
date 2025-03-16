
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DisplayPreferences } from "./Preferences/DisplayPreferences";
import { TaskPreferences } from "./Preferences/TaskPreferences";
import { NotificationPreferences } from "./Preferences/NotificationPreferences";
import { AdvancedPreferences } from "./Preferences/AdvancedPreferences";

export const UserPreferencesPanel = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>User Preferences</CardTitle>
        <CardDescription>
          Customize your AutoEarn experience
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="display">
        <div className="px-6">
          <TabsList className="w-full">
            <TabsTrigger value="display" className="flex-1">Display</TabsTrigger>
            <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6">
          <TabsContent value="display">
            <DisplayPreferences />
          </TabsContent>
          
          <TabsContent value="tasks">
            <TaskPreferences />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationPreferences />
          </TabsContent>
          
          <TabsContent value="advanced">
            <AdvancedPreferences />
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="border-t px-6 py-4 bg-muted/50">
        <p className="text-xs text-muted-foreground">
          All preferences are stored locally in your browser.
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserPreferencesPanel;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ThemeToggle from "./ThemeToggle";
import MatrixThemeToggle from "./MatrixThemeToggle";
import WelcomeGuideToggle from "./WelcomeGuideToggle";
import TaskViewToggle from "./TaskViewToggle";
import AnimationsToggle from "./AnimationsToggle";

const AppearanceSettings = () => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how DEVONN.AI Moneyhub looks and feels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <ThemeToggle />
          <MatrixThemeToggle />
        </div>
        
        <div className="space-y-4">
          <WelcomeGuideToggle />
          <TaskViewToggle />
          <AnimationsToggle />
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;

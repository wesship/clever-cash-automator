
import React, { useEffect } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Background3D from "@/components/ui/3d-background";
import ErrorBoundary from "@/components/ui/error-boundary";
import { WelcomeGuide } from "@/components/ui/onboarding";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { TabsContent } from "@/components/ui/tabs";
import useDashboardData from "@/hooks/use-dashboard-data";
import { useNavigate, useSearchParams } from "react-router-dom";
import useTabNavigation from "@/hooks/use-tab-navigation";
import { NotificationManager } from "@/services/notification-manager";

// Newly created components
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import TasksTab from "@/components/Dashboard/TasksTab";
import CreateTaskTab from "@/components/Dashboard/CreateTaskTab";

const Index = () => {
  const { preferences } = useUserPreferences();
  const { activeTab, setActiveTab } = useTabNavigation("overview");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const {
    tasks,
    statistics,
    isLoading,
    handleCreateTask,
  } = useDashboardData();

  // Request notification permissions when app loads
  useEffect(() => {
    if (preferences.notificationsEnabled) {
      NotificationManager.requestPermission();
    }
  }, [preferences.notificationsEnabled]);
  
  // Check for template ID in URL
  useEffect(() => {
    const templateId = searchParams.get('templateId');
    if (templateId) {
      setActiveTab("create");
    }
  }, [searchParams, setActiveTab]);

  const handleDeleteTasks = (taskIds: string[]) => {
    // This is a placeholder function, as it seems this was not implemented
    console.log("Deleting tasks with IDs:", taskIds);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      {preferences.showWelcomeGuide && <WelcomeGuide />}
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader title="DEVONN.AI Moneyhub Dashboard" />

          <ErrorBoundary>
            <DashboardTabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
            >
              <TabsContent value="overview">
                <DashboardOverview 
                  statistics={statistics}
                  tasks={tasks}
                  isLoading={isLoading}
                  onViewAllTasks={() => setActiveTab("tasks")}
                />
              </TabsContent>

              <TabsContent value="tasks">
                <TasksTab 
                  tasks={tasks}
                  onCreateTask={() => setActiveTab("create")}
                  onDeleteTasks={handleDeleteTasks}
                  onViewTaskDetails={(taskId) => navigate(`/task/${taskId}`)}
                />
              </TabsContent>
              
              <TabsContent value="create">
                <CreateTaskTab 
                  onSubmit={handleCreateTask}
                  onCancel={() => setActiveTab("tasks")}
                />
              </TabsContent>
            </DashboardTabs>
          </ErrorBoundary>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

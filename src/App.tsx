
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Analytics from "@/pages/Analytics";
import TaskDetail from "@/pages/TaskDetail";
import Accounts from "@/pages/Accounts";
import AccountDetail from "@/pages/AccountDetail";
import Departments from "@/pages/Departments";
import DepartmentDetail from "@/pages/DepartmentDetail";
import AnalyticsDetail from "@/pages/AnalyticsDetail";
import Settings from "@/pages/Settings";
import BackgroundDemo from "@/pages/BackgroundDemo";
import NotFound from "@/pages/NotFound";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/hooks/use-theme";
import { MatrixThemeProvider } from "@/hooks/use-matrix-theme";
import { TaskExecutionProvider } from "@/providers/TaskExecutionProvider";
import { UserPreferencesProvider } from "@/hooks/use-user-preferences";

function App() {
  return (
    <ThemeProvider>
      <MatrixThemeProvider>
        <UserPreferencesProvider>
          <TaskExecutionProvider>
            <Toaster closeButton position="top-right" />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/analytics/:id" element={<AnalyticsDetail />} />
              <Route path="/task/:id" element={<TaskDetail />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/account/:id" element={<AccountDetail />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/department/:id" element={<DepartmentDetail />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/background-demo" element={<BackgroundDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TaskExecutionProvider>
        </UserPreferencesProvider>
      </MatrixThemeProvider>
    </ThemeProvider>
  );
}

export default App;

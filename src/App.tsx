import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { UserPreferencesProvider } from "@/hooks/use-user-preferences";
import { useState, useEffect } from "react";
import { Loader } from "@/components/ui/Loader";
import ErrorBoundary from "@/components/ui/error-boundary";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";
import Departments from "./pages/Departments";
import NotFound from "./pages/NotFound";
import BackgroundDemo from "./pages/BackgroundDemo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader size="lg" className="mx-auto border-primary" />
          <p className="mt-4 text-lg text-gradient animate-pulse">Loading AutoEarn...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UserPreferencesProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/departments" element={<Departments />} />
                  <Route path="/background-demo" element={<BackgroundDemo />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </UserPreferencesProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

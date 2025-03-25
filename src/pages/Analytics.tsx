
import React, { useState } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Background3D from "@/components/ui/3d-background";
import AnalyticsHeader from "@/components/Analytics/AnalyticsHeader";
import AnalyticsCards from "@/components/Analytics/AnalyticsCards";
import AnalyticsTabs from "@/components/Analytics/AnalyticsTabs";
import AnalyticsPerformance from "@/components/Analytics/AnalyticsPerformance";

const Analytics = () => {
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("month");

  // Mock data
  const earningsData = {
    day: { amount: 4.25, change: "+12%" },
    week: { amount: 28.70, change: "+8%" },
    month: { amount: 116.05, change: "+22%" },
    year: { amount: 1245.80, change: "+45%" }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <AnalyticsHeader />
          <AnalyticsCards period={period} earningsData={earningsData} />
          <AnalyticsTabs />
          <AnalyticsPerformance />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;

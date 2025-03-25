
import React from "react";
import { useNavigate } from "react-router-dom";

const AnalyticsHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 mb-8">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-gradient">Analytics Dashboard</span>
      </h1>
    </div>
  );
};

export default AnalyticsHeader;

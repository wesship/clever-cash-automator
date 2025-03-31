
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useTabNavigation = (defaultTab: string = "overview") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Initialize activeTab from URL parameters
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'create') {
      setActiveTab('create');
    }
  }, [searchParams]);
  
  // Update function for activeTab that handles URL parameters
  const updateActiveTab = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'create') {
      searchParams.set('tab', 'create');
      setSearchParams(searchParams);
    } else if (searchParams.has('tab')) {
      searchParams.delete('tab');
      setSearchParams(searchParams);
    }
  };
  
  return {
    activeTab,
    setActiveTab: updateActiveTab,
    searchParams,
    setSearchParams
  };
};

export default useTabNavigation;


import React from "react";
import ProxyCard from "./ProxyCard";

interface ProxyProps {
  id: string;
  name: string;
  location: string;
  status: string;
  type: string;
  ipCount: number;
  usedBy: number;
}

const ProxiesList = ({ proxies }: { proxies: ProxyProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {proxies.map((proxy) => (
        <ProxyCard key={proxy.id} proxy={proxy} />
      ))}
    </div>
  );
};

export default ProxiesList;

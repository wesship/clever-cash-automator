
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

interface ProxiesListProps {
  proxies: ProxyProps[];
  onDelete: (proxyId: string) => void; // Added the missing onDelete prop
}

const ProxiesList = ({ proxies, onDelete }: ProxiesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {proxies.length > 0 ? (
        proxies.map((proxy) => (
          <ProxyCard 
            key={proxy.id} 
            proxy={proxy} 
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="col-span-3 p-8 text-center">
          <p className="text-muted-foreground">No proxies found. Add your first proxy to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ProxiesList;

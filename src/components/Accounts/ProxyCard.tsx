
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";

interface ProxyProps {
  id: string;
  name: string;
  location: string;
  status: string;
  type: string;
  ipCount: number;
  usedBy: number;
}

const ProxyCard = ({ proxy }: { proxy: ProxyProps }) => {
  return (
    <Card key={proxy.id} className="bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{proxy.name}</CardTitle>
          <Badge variant={proxy.status === "active" ? "default" : "secondary"}>
            {proxy.status}
          </Badge>
        </div>
        <CardDescription>{proxy.type} - {proxy.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">IP Count</span>
            <span className="text-sm">{proxy.ipCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Used By</span>
            <span className="text-sm">{proxy.usedBy} accounts</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" className="gap-1">
          <Edit2 className="h-3 w-3" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" className="gap-1">
          <Trash2 className="h-3 w-3" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProxyCard;

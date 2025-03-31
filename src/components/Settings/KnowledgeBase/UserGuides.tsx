
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { GuideType } from "./types";

interface UserGuidesProps {
  filteredGuides: GuideType[];
  onSelectGuide: (guide: GuideType) => void;
}

const UserGuides = ({ filteredGuides, onSelectGuide }: UserGuidesProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {filteredGuides.length > 0 ? (
        filteredGuides.map((guide) => (
          <Card key={guide.id} className="overflow-hidden h-full">
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{guide.title}</h3>
                <Badge variant={guide.level === "Beginner" ? "default" : guide.level === "Intermediate" ? "secondary" : "outline"}>
                  {guide.level}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{guide.description}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground mt-auto">
                <span>Last updated: {guide.updated}</span>
                <span>{guide.timeToRead} min read</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 w-full justify-between"
                onClick={() => onSelectGuide(guide)}
              >
                Read guide <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <div className="col-span-2 flex items-center justify-center p-8 text-center">
          <div>
            <h3 className="font-medium mb-1">No guides found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search terms</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGuides;

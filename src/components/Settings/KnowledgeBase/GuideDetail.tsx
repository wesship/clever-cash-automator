
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { GuideType } from "./types";

interface GuideDetailProps {
  guide: GuideType;
  onBack: () => void;
}

const GuideDetail = ({ guide, onBack }: GuideDetailProps) => {
  // Convert markdown-style content to basic HTML
  const renderContent = () => {
    if (!guide.content) return null;
    
    // Split the content by line breaks
    const lines = guide.content.split('\n');
    
    return lines.map((line, index) => {
      // Handle headings (# Heading)
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h2>;
      }
      // Handle sub-headings (## Heading)
      if (line.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-medium mt-4 mb-3">{line.substring(3)}</h3>;
      }
      // Handle empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-2"></div>;
      }
      // Normal paragraphs
      return <p key={index} className="mb-3 text-muted-foreground">{line}</p>;
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-0 h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Badge variant={guide.level === "Beginner" ? "default" : guide.level === "Intermediate" ? "secondary" : "outline"}>
            {guide.level}
          </Badge>
        </div>
        <CardTitle className="text-xl">{guide.title}</CardTitle>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Last updated: {guide.updated}</span>
          <span>{guide.timeToRead} min read</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
          {renderContent()}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuideDetail;

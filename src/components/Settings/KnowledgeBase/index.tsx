
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "./SearchBar";
import UserGuides from "./UserGuides";
import FAQSection from "./FAQSection";
import APIDocumentation from "./APIDocumentation";
import GuideDetail from "./GuideDetail";
import useKnowledgeBase from "./useKnowledgeBase";
import { GuideType } from "./types";

const KnowledgeBase = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    activeTab,
    setActiveTab,
    filteredGuides, 
    filteredFaqCategories, 
    filteredEndpoints 
  } = useKnowledgeBase();

  const [selectedGuide, setSelectedGuide] = useState<GuideType | null>(null);

  const handleSelectGuide = (guide: GuideType) => {
    setSelectedGuide(guide);
  };

  const handleBackToGuides = () => {
    setSelectedGuide(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base</CardTitle>
          <CardDescription>
            Access documentation, guides and frequently asked questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="guides" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="guides">User Guides</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="api">API Documentation</TabsTrigger>
            </TabsList>
            
            <div className="mb-4">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            
            <TabsContent value="guides" className="space-y-4">
              {selectedGuide ? (
                <GuideDetail guide={selectedGuide} onBack={handleBackToGuides} />
              ) : (
                <UserGuides filteredGuides={filteredGuides} onSelectGuide={handleSelectGuide} />
              )}
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-4">
              <FAQSection filteredCategories={filteredFaqCategories} />
            </TabsContent>
            
            <TabsContent value="api">
              <APIDocumentation filteredEndpoints={filteredEndpoints} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBase;

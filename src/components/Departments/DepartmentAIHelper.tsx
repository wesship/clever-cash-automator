
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePerplexityApi } from '@/hooks/use-perplexity-api';
import { GenerationType } from '@/types/ai-types';
import APIKeyManager from './APIKeyManager';
import GenerationTypeSelect from './GenerationTypeSelect';
import GenerationForm from './GenerationForm';
import ErrorBoundary from "@/components/ui/error-boundary";
import DepartmentAIHelperError from './DepartmentAIHelperError';

interface DepartmentAIHelperProps {
  onDescriptionGenerated: (description: string) => void;
}

const DepartmentAIHelper: React.FC<DepartmentAIHelperProps> = ({ onDescriptionGenerated }) => {
  const { apiKey } = usePerplexityApi();
  const [selectedType, setSelectedType] = useState<GenerationType>('description');

  return (
    <ErrorBoundary
      fallback={DepartmentAIHelperError}
    >
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>AI Department Assistant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <APIKeyManager />
          <GenerationTypeSelect 
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
          <GenerationForm
            apiKey={apiKey}
            selectedType={selectedType}
            onGenerate={onDescriptionGenerated}
          />
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};

export default DepartmentAIHelper;

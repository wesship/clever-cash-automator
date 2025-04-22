
import React, { useState } from 'react';
import { GenerationType } from '@/types/ai-types';
import { usePerplexityApi } from '@/hooks/use-perplexity-api';
import ErrorBoundary from "@/components/ui/error-boundary";
import DepartmentAIHelperError from '../DepartmentAIHelperError';
import AIHelperCard from './AIHelperCard';
import APIKeyManager from '../APIKeyManager';
import GenerationTypeSelect from '../GenerationTypeSelect';
import GenerationForm from '../GenerationForm';

interface DepartmentAIHelperProps {
  onDescriptionGenerated: (description: string) => void;
}

const DepartmentAIHelper: React.FC<DepartmentAIHelperProps> = ({ onDescriptionGenerated }) => {
  const { apiKey } = usePerplexityApi();
  const [selectedType, setSelectedType] = useState<GenerationType>('description');

  return (
    <ErrorBoundary
      fallback={({ error, resetErrorBoundary }) => (
        <DepartmentAIHelperError 
          error={error} 
          resetErrorBoundary={resetErrorBoundary} 
        />
      )}
    >
      <AIHelperCard>
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
      </AIHelperCard>
    </ErrorBoundary>
  );
};

export default DepartmentAIHelper;


import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GENERATION_OPTIONS, GenerationType } from '@/types/ai-types';

interface GenerationTypeSelectProps {
  selectedType: GenerationType;
  onTypeChange: (type: GenerationType) => void;
}

const GenerationTypeSelect: React.FC<GenerationTypeSelectProps> = ({
  selectedType,
  onTypeChange
}) => {
  return (
    <Select
      value={selectedType}
      onValueChange={(value: GenerationType) => onTypeChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select generation type" />
      </SelectTrigger>
      <SelectContent>
        {GENERATION_OPTIONS.map((option) => (
          <SelectItem key={option.type} value={option.type}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GenerationTypeSelect;

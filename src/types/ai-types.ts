
export type GenerationType = 'description' | 'goals' | 'responsibilities' | 'metrics';

export interface GenerationOption {
  type: GenerationType;
  label: string;
  systemPrompt: string;
  placeholder: string;
}

export const GENERATION_OPTIONS: GenerationOption[] = [
  {
    type: 'description',
    label: 'Department Description',
    systemPrompt: 'Generate a concise and professional department description for a business.',
    placeholder: 'Generate a description for the Marketing department'
  },
  {
    type: 'goals',
    label: 'Department Goals',
    systemPrompt: 'Generate specific, measurable goals for a business department.',
    placeholder: 'Generate quarterly goals for the Sales department'
  },
  {
    type: 'responsibilities',
    label: 'Key Responsibilities',
    systemPrompt: 'List the main responsibilities and duties for a business department.',
    placeholder: 'Generate key responsibilities for the IT department'
  },
  {
    type: 'metrics',
    label: 'Performance Metrics',
    systemPrompt: 'Suggest relevant KPIs and performance metrics for a business department.',
    placeholder: 'Generate performance metrics for the Customer Service department'
  }
];

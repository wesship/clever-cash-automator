
import { useState, useEffect, useMemo } from 'react';
import { guides, faqCategories, apiEndpoints, GuideType, FAQCategoryType, APIEndpointType } from './types';

export const useKnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("guides");
  
  const filteredGuides = useMemo(() => {
    return guides.filter(
      guide => guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
               guide.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  
  const filteredFaqCategories = useMemo(() => {
    return faqCategories.map(category => {
      const filteredQuestions = category.questions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return {
        ...category,
        questions: filteredQuestions,
        filtered: filteredQuestions.length > 0 || category.name.toLowerCase().includes(searchTerm.toLowerCase())
      };
    }).filter(category => category.filtered);
  }, [searchTerm]);
  
  const filteredEndpoints = useMemo(() => {
    return apiEndpoints.filter(endpoint => 
      endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  
  return {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    filteredGuides,
    filteredFaqCategories,
    filteredEndpoints
  };
};

export default useKnowledgeBase;

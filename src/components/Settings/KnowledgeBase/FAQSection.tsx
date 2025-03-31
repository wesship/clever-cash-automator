
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FAQCategoryType } from "./types";

interface FAQSectionProps {
  filteredCategories: FAQCategoryType[];
}

const FAQSection = ({ filteredCategories }: FAQSectionProps) => {
  return (
    <>
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="text-lg">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.questions.filter(faq => 
                  category.filtered ? true : false
                ).map((faq, index) => (
                  <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="flex items-center justify-center p-8 text-center">
            <div>
              <h3 className="font-medium mb-1">No FAQs found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search terms</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default FAQSection;

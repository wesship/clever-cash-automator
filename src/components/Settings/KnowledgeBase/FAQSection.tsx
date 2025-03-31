
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FAQCategoryType } from "./types";

interface FAQSectionProps {
  filteredCategories: FAQCategoryType[];
}

const FAQSection = ({ filteredCategories }: FAQSectionProps) => {
  return (
    <>
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <Card key={category.id} className="mb-4 last:mb-0">
            <CardHeader>
              <CardTitle className="text-lg">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.filter(faq => 
                  category.filtered ? true : false
                ).map((faq, index) => (
                  <AccordionItem key={index} value={`item-${category.id}-${index}`}>
                    <AccordionTrigger className="text-left font-medium py-2">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pt-1 pb-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';

interface TabOption {
  value: string;
  label: string;
}

interface MobileTabDropdownProps {
  activeTab: string;
  tabOptions: TabOption[];
  onTabChange: (value: string) => void;
}

export function MobileTabDropdown({ activeTab, tabOptions, onTabChange }: MobileTabDropdownProps) {
  const [accordionValue, setAccordionValue] = useState<string | undefined>(undefined);

  const activeTabLabel = tabOptions.find(tab => tab.value === activeTab)?.label || 'Select a tab';

  const handleTabClick = (value: string) => {
    onTabChange(value);
    setAccordionValue(undefined); // Close the accordion when a tab is selected
  };

  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        value={accordionValue}
        onValueChange={setAccordionValue}
        className="border-teal rounded-xl border"
      >
        <AccordionItem value="tabs" className="border-none">
          <AccordionTrigger className="px-4 py-3 text-left text-sm font-medium">
            {activeTabLabel}
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-2">
            <div className="flex flex-col space-y-1">
              {tabOptions.map(tab => (
                <button
                  key={tab.value}
                  className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeTab === tab.value
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                  onClick={() => handleTabClick(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

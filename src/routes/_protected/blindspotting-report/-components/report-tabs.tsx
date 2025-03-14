import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TabOption = {
  value: string;
  label: string;
};

interface ReportTabsProps {
  activeTab: string;
  tabOptions: TabOption[];
  onTabChange: (value: string) => void;
}

export function ReportTabs({ activeTab, tabOptions, onTabChange }: ReportTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="h-tab rounded-tab bg-light-blue grid w-full grid-cols-7 overflow-hidden p-1">
        {tabOptions.map(tab => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-tab data-[state=active]:bg-teal data-[state=inactive]:bg-light-blue data-[state=active]:text-teal-foreground data-[state=inactive]:text-light-blue-foreground py-3 text-sm font-medium transition-colors"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

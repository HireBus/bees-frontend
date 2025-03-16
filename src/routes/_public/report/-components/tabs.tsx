import { TabsList, TabsTrigger, Tabs as TabsUI } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useQueryState } from 'nuqs';

export type TabItem = {
  key: string;
  label: string;
};

interface TabsProps {
  items: TabItem[];
  defaultActiveTab?: string;
  className?: string;
}

export function Tabs({ items, defaultActiveTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useQueryState('tab', {
    defaultValue: defaultActiveTab ?? items[0].key,
    clearOnDefault: false,
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <TabsUI
      value={activeTab}
      onValueChange={handleTabChange}
      className={cn('h-full max-h-[52px] w-full', className)}
    >
      <TabsList className="flex h-14 w-full justify-between gap-2 rounded-full bg-[#F5F6FF] p-0">
        {items.map(item => (
          <TabsTrigger
            key={item.key}
            value={item.key}
            className={cn(
              'h-full w-full rounded-full px-6 py-2.5 text-sm font-medium transition-all',
              'data-[state=active]:rounded-full data-[state=active]:bg-primary data-[state=active]:font-bold data-[state=active]:text-white',
              'data-[state=inactive]:font-light data-[state=inactive]:text-primary-content data-[state=inactive]:hover:bg-primary/5'
            )}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </TabsUI>
  );
}

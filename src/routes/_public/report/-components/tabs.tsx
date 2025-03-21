import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
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
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <ScrollArea>
      <TabsUI
        value={activeTab}
        onValueChange={handleTabChange}
        className={cn('relative h-12 w-full md:h-full', className)}
      >
        <TabsList
          className={cn(
            'absolute flex h-full w-full justify-stretch bg-transparent md:relative',
            // Desktop styles
            'md:h-14 md:justify-between md:gap-2 md:rounded-full md:bg-[#F5F6FF]'
          )}
        >
          {items.map(item => (
            <TabsTrigger
              key={item.key}
              value={item.key}
              className={cn(
                'relative h-full min-w-[120px] px-4 py-2 text-sm font-medium transition-all',
                'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:opacity-0 after:transition-opacity',
                'data-[state=active]:after:opacity-100',
                'data-[state=active]:font-bold data-[state=active]:text-primary',
                'data-[state=inactive]:font-light data-[state=inactive]:text-primary-content',
                // Desktop styles
                'md:w-full md:rounded-full md:px-6 md:py-2.5',
                'md:after:hidden md:data-[state=active]:bg-primary md:data-[state=active]:text-white',
                'md:data-[state=inactive]:text-primary-content md:data-[state=inactive]:hover:bg-primary/5'
              )}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </TabsUI>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
}

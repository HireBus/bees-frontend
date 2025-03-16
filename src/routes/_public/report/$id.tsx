import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronLeftIcon, ChevronRightIcon, PrinterIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { SummaryTabContent, SummaryTabHeader } from './-components/summary-tab';
import { Tabs } from './-components/tabs';

export const Route = createFileRoute('/_public/report/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  // Will use id param in the future
  // const { id } = Route.useParams();

  const [activeTab, setActiveTab] = useQueryState('tab');

  const tabs = [
    { key: 'summary', label: 'Summary' },
    { key: 'identity', label: 'Identity' },
    { key: 'motive', label: 'Motive' },
    { key: 'traits', label: 'Traits' },
    { key: 'emotion', label: 'Emotion' },
    { key: 'intellect', label: 'Intellect' },
    { key: 'behavior', label: 'Behavior' },
  ];

  const currentTabIndex = tabs.findIndex(tab => tab.key === activeTab);
  const prevTab = currentTabIndex > 0 ? tabs[currentTabIndex - 1] : null;
  const nextTab = currentTabIndex < tabs.length - 1 ? tabs[currentTabIndex + 1] : null;

  const handlePrevTab = () => {
    if (prevTab) {
      setActiveTab(prevTab.key);
    }
  };

  const handleNextTab = () => {
    if (nextTab) {
      setActiveTab(nextTab.key);
    }
  };

  return (
    <div className="flex h-full w-full flex-col px-5 pb-20 pt-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-start justify-between py-10">
          {activeTab === 'summary' && <SummaryTabHeader />}
          <Button variant="outline" color="primary">
            <PrinterIcon className="h-4 w-4" />
            Print Report
          </Button>
        </div>

        <Tabs items={tabs} />

        {activeTab === 'summary' && <SummaryTabContent />}

        {/* Page Number */}
        <div className="mt-12 flex items-center gap-4 pb-8">
          <p className="text-sm text-secondary-content">
            {currentTabIndex + 1} of {tabs.length}
          </p>
          <div className="flex items-center gap-4">
            {prevTab && (
              <>
                <button
                  className="flex items-center gap-1 text-sm font-medium text-primary-content"
                  onClick={handlePrevTab}
                >
                  <ChevronLeftIcon className="h-4 w-4" /> {prevTab.label}
                </button>
                <span className="text-sm font-medium text-primary-content">|</span>
              </>
            )}
            {nextTab && (
              <button
                className="flex items-center gap-1 text-sm font-medium text-primary-content"
                onClick={handleNextTab}
              >
                {nextTab.label} <ChevronRightIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

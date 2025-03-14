import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/use-media-query';
import { PrinterIcon } from 'lucide-react';
import { useState } from 'react';
import { BlindspotChart } from './blindspot-chart';
import { BlindspotTable } from './blindspot-table';
import { MobileTabDropdown } from './mobile-tab-dropdown';
import { ReportTabs } from './report-tabs';

export function BlindspottingReport() {
  const [activeTab, setActiveTab] = useState('summary');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const tabOptions = [
    { value: 'summary', label: 'Summary' },
    { value: 'identity', label: 'Identity' },
    { value: 'motive', label: 'Motive' },
    { value: 'trait', label: 'Traits' },
    { value: 'emotion', label: 'Emotion' },
    { value: 'intellect', label: 'Intellect' },
    { value: 'behavior', label: 'Behavior' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold">Blind Spotting</h1>
      </div>

      {/* Report Title Section */}
      <Card className="p-6">
        <div className="mb-3 flex items-center justify-between md:mb-5">
          <h2 className={`text-2xl font-bold md:text-3xl ${isMobile ? 'w-full text-center' : ''}`}>
            Your Blindspotting Report
          </h2>
          {!isMobile && (
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <PrinterIcon className="h-4 w-4" />
              <span>Print Report</span>
            </Button>
          )}
        </div>
        <p className="text-muted-foreground">
          Your personalized report highlights potential blindspots across different dimensions of
          leadership effectiveness.
        </p>

        {/* Report Navigation - Switch between Tabs and Dropdown based on screen size */}
        <div className="mt-6">
          {isMobile ? (
            <MobileTabDropdown
              activeTab={activeTab}
              tabOptions={tabOptions}
              onTabChange={handleTabChange}
            />
          ) : (
            <ReportTabs
              activeTab={activeTab}
              tabOptions={tabOptions}
              onTabChange={handleTabChange}
            />
          )}

          {/* Tab Contents */}
          <div className="mt-6 space-y-8">
            {activeTab === 'summary' && (
              <>
                {/* Desktop Layout */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left column: Text sections */}
                    <div className="space-y-8">
                      {/* How to Use Section */}
                      <div>
                        <h3 className="mb-4 text-xl font-semibold">
                          How to Use the Blindspotting Report
                        </h3>
                        <p className="text-muted-foreground">
                          This report is organized into distinct sections, each focusing on a
                          different aspect of leadership effectiveness. Navigate through the tabs
                          above to read about your Identity, Motive, Trait, Emotion, or Behavior
                          patterns. Each section provides specific examples and actionable
                          recommendations for growth.
                        </p>
                      </div>

                      {/* Your Blindspot Summary */}
                      <div>
                        <h3 className="mb-4 text-xl font-semibold">Your Blindspot Summary</h3>
                        <p className="text-muted-foreground">
                          Your assessment results indicate specific areas where blindspots may be
                          limiting your leadership effectiveness. These insights are based on your
                          responses and are designed to help you understand patterns that might be
                          limiting your potential. Use this information to develop strategies for
                          growth and enhanced self-awareness.
                        </p>
                      </div>
                    </div>

                    {/* Right column: Chart */}
                    <div className="flex flex-col items-center justify-center">
                      <BlindspotChart
                        blindspots={[
                          { id: 'emotion', label: 'Emotion', weight: 75 },
                          { id: 'intellect', label: 'Intellect', weight: 30 },
                          { id: 'motive', label: 'Motive', weight: 90 },
                          // trait, behavior, and identity not included, so they'll be white with gray stroke
                        ]}
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="space-y-8 md:hidden">
                  {/* How to Use Section */}
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">
                      How to Use the Blindspotting Report
                    </h3>
                    <p className="text-muted-foreground">
                      This report is organized into distinct sections, each focusing on a different
                      aspect of leadership effectiveness. Navigate through the tabs above to read
                      about your Identity, Motive, Trait, Emotion, or Behavior patterns. Each
                      section provides specific examples and actionable recommendations for growth.
                    </p>
                  </div>

                  {/* Your Blindspot Summary */}
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Your Blindspot Summary</h3>
                    <p className="text-muted-foreground">
                      Your assessment results indicate specific areas where blindspots may be
                      limiting your leadership effectiveness. These insights are based on your
                      responses and are designed to help you understand patterns that might be
                      limiting your potential. Use this information to develop strategies for growth
                      and enhanced self-awareness.
                    </p>
                  </div>

                  {/* Chart Section */}
                  <div className="flex flex-col items-center">
                    <BlindspotChart
                      blindspots={[
                        { id: 'emotion', label: 'Emotion', weight: 75 },
                        { id: 'intellect', label: 'Intellect', weight: 30 },
                        { id: 'motive', label: 'Motive', weight: 90 },
                        // trait, behavior, and identity not included, so they'll be white with gray stroke
                      ]}
                    />
                  </div>
                </div>

                {/* Table Section */}
                <BlindspotTable />
              </>
            )}

            {activeTab === 'identity' && <div className="py-4">Identity content would go here</div>}
            {activeTab === 'motive' && <div className="py-4">Motive content would go here</div>}
            {activeTab === 'trait' && <div className="py-4">Traits content would go here</div>}
            {activeTab === 'emotion' && <div className="py-4">Emotion content would go here</div>}
            {activeTab === 'intellect' && (
              <div className="py-4">Intellect content would go here</div>
            )}
            {activeTab === 'behavior' && <div className="py-4">Behavior content would go here</div>}
          </div>
        </div>
      </Card>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div>1 of 7</div>
        <div className="flex items-center gap-2">
          <span>Identity</span>
          <span>→</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
        <div>© 2023 Behavioral Essentials</div>
        <div className="flex items-center gap-2">
          <span>Need Help?</span>
          <a
            href="mailto:contact@behavioralessentials.com"
            className="text-teal-500 hover:underline"
          >
            contact@behavioralessentials.com
          </a>
        </div>
      </div>
    </div>
  );
}

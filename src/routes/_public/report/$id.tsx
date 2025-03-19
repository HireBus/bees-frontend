import { Button } from '@/components/ui/button';
import { usePublicCodeQuery } from '@/hooks/query/codes/use-public-code-query';
import {
  calculateReportService,
  parseE3Scales21,
  type Threshold,
  type TraitScaleMappingReport,
} from '@/services/calculate-report';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronLeftIcon, ChevronRightIcon, PrinterIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';
import { TraitsTabContent } from './-components/blindspot/traits-tab';
import { IdentityTabContent } from './-components/identity-tab';
import { SummaryTabContent } from './-components/summary-tab';
import { Tabs } from './-components/tabs';

export const Route = createFileRoute('/_public/report/$id')({
  component: RouteComponent,
});

const REPORT_TYPES = {
  blindspot: 'blindspot',
} as const;

function RouteComponent() {
  const { id } = Route.useParams();

  const { data: codeData, isLoading: isCodeLoading } = usePublicCodeQuery({ id });

  const summaryReport = useMemo(() => {
    if (!codeData) return null;
    const parsedScores = parseE3Scales21(codeData.surveyResult.e3_scales21);
    if (!parsedScores) return null;

    const calculatedReports = calculateReportService({
      report: codeData.traitScaleMappingsReport as TraitScaleMappingReport,
      scores: parsedScores,
      thresholds: codeData.traitScaleMappingsReport.thresholds as Threshold[],
    });

    const categories = Object.keys(calculatedReports);

    return { calculatedReports, categories };
  }, [codeData]);

  const tabs = useMemo(() => {
    const defaultTabs = [
      { key: 'summary', label: 'Summary' },
      { key: 'identity', label: 'Identity' },
    ];
    if (!summaryReport?.categories.length) return defaultTabs;
    return [
      ...defaultTabs,
      ...summaryReport.categories.map(category => ({ key: `report-${category}`, label: category })),
    ];
  }, [summaryReport?.categories]);

  const [activeTab, setActiveTab] = useQueryState('tab', {
    defaultValue: tabs[0].key,
  });

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

  const isDefaultTab = activeTab === 'summary' || activeTab === 'identity';
  const activeDynamicTab = isDefaultTab ? null : activeTab.split('-')[1];

  // TODO: When the report type is added in the database, we should use it here
  const reportType = REPORT_TYPES.blindspot;

  return (
    <div className="flex h-full w-full flex-col px-5 pb-20 pt-40">
      {isCodeLoading ? (
        <div className="flex h-full w-full items-center justify-center">Loading...</div>
      ) : (
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex items-start justify-between py-10">
            <ReportHeader
              title={codeData?.traitScaleMappingsReport.name ?? ''}
              description={codeData?.traitScaleMappingsReport.description ?? ''}
            />
            <Button variant="outline" color="primary">
              <PrinterIcon className="h-4 w-4" />
              Print Report
            </Button>
          </div>

          <Tabs items={tabs} />

          {activeTab === 'summary' && (
            <SummaryTabContent
              calculatedReports={summaryReport?.calculatedReports ?? {}}
              categories={summaryReport?.categories ?? []}
            />
          )}

          {activeTab === 'identity' && (
            <IdentityTabContent firstName={codeData?.surveyResult.first ?? ''} />
          )}

          {activeDynamicTab &&
            summaryReport?.categories.map(category => {
              const calculatedReport = summaryReport?.calculatedReports[category];

              if (
                reportType === REPORT_TYPES.blindspot &&
                activeDynamicTab.toLowerCase() === category.toLowerCase() &&
                category.toLowerCase().includes('trait')
              ) {
                return (
                  <TraitsTabContent
                    key={category}
                    thresholds={codeData?.traitScaleMappingsReport.thresholds as Threshold[]}
                    calculatedReport={calculatedReport ?? []}
                  />
                );
              }

              return null;
            })}

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
                  {nextTab && <span className="text-sm font-medium text-primary-content">|</span>}
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
      )}
    </div>
  );
}

export type ReportHeaderProps = {
  title: string;
  description: string;
};

function ReportHeader({ title, description }: ReportHeaderProps) {
  return (
    <div>
      <h1 className="text-[36px] font-bold text-primary-content">{title}</h1>
      <p className="mt-2 font-light text-secondary-content">{description}</p>
    </div>
  );
}

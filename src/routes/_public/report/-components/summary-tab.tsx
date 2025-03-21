import ChartSvg from '@/assets/chart.svg?react';
import { Separator } from '@/components/ui/separator';
import { type calculateReportService } from '@/services/calculate-report';

export type SummaryTabContentProps = {
  categories: string[];
  calculatedReports: ReturnType<typeof calculateReportService>;
};

export function SummaryTabContent({ categories, calculatedReports }: SummaryTabContentProps) {
  return (
    <div className="mt-12">
      {/* First Row - Equal Columns */}
      <div className="mb-12 grid h-auto items-center gap-12 md:grid-cols-2">
        {/* How to Use Section */}
        <div className="flex flex-col gap-14">
          <div>
            <h2 className="text-xl font-bold text-primary-content">
              How to Use the Blindspotting Report
            </h2>
            <p className="mt-4 font-light text-secondary-content">
              This report is organized into distinct sections, each focusing on a different aspect
              of leadership effectiveness. Navigate through the tabs above to explore detailed
              insights about your Identity, Motive, Trait, Intellect, Emotion, and Behavior
              patterns. Each section provides specific examples and actionable recommendations for
              growth.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary-content">Your Blindspot Summary</h2>
            <p className="mt-4 font-light text-secondary-content">
              Your assessment results indicate specific areas where blindspots may be impacting your
              leadership effectiveness. These insights are based on your responses and are designed
              to help you understand patterns that might be limiting your potential. Use this
              information to develop strategies for growth and enhanced self-awareness.
            </p>
          </div>
        </div>

        {/* Circular Diagram */}
        <div className="w-full max-w-[522px]">
          <ChartSvg className="h-auto w-full" />
        </div>
      </div>

      {/* Second Row - Full Width Content */}
      <div className="mt-14">
        <ResultsTable categories={categories} calculatedReports={calculatedReports} />
      </div>
    </div>
  );
}

export type ResultsTableProps = {
  categories: string[];
  calculatedReports: ReturnType<typeof calculateReportService>;
};

export function ResultsTable({ categories, calculatedReports }: ResultsTableProps) {
  return (
    <div className="overflow-hidden md:rounded-lg md:border md:border-[#E4E4E7]">
      {/* Desktop Table */}
      <table className="hidden w-full table-fixed md:block">
        <thead className="bg-[#CCF5F2]">
          <tr>
            <th className="w-[15%] px-6 py-4 text-left text-xl font-bold text-primary-content">
              Category
            </th>
            <th className="w-[25%] px-6 py-4 text-left text-xl font-bold text-primary-content">
              Your Blindspot
            </th>
            <th className="px-6 py-4 text-left text-xl font-bold text-primary-content">Summary</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E4E4E7]">
          {categories.map(category => {
            const calculatedReport = calculatedReports[category];
            return (
              <tr key={category}>
                <td className="px-6 py-4 text-xl font-bold text-primary-content">{category}</td>
                <td className="px-6 py-4 font-light">{calculatedReport[0].traitName}</td>
                <td className="px-6 py-4 font-light">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: calculatedReport[0].overrideContent ?? '',
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Mobile Table */}
      <div className="block md:hidden">
        <div className="flex flex-col gap-6">
          {categories.map(category => {
            const calculatedReport = calculatedReports[category];
            return (
              <div key={category} className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex flex-col gap-1">
                  <div className="font-light text-secondary-content">Category</div>
                  <div className="text-lg font-bold text-primary-content">{category}</div>
                </div>
                <Separator />
                <div className="flex flex-col gap-1">
                  <div className="font-light text-secondary-content">Your Blindspot</div>
                  <div className="text-lg font-bold text-primary-content">
                    {calculatedReport[0].traitName}
                  </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-1">
                  <div className="font-light text-secondary-content">Summary</div>
                  <div
                    className="font-light text-primary-content"
                    dangerouslySetInnerHTML={{
                      __html: calculatedReport[0].overrideContent ?? '',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

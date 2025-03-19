import ChartSvg from '@/assets/chart.svg?react';
import { type calculateReportService } from '@/services/calculate-report';

export type SummaryTabContentProps = {
  categories: string[];
  calculatedReports: ReturnType<typeof calculateReportService>;
};

export function SummaryTabContent({ categories, calculatedReports }: SummaryTabContentProps) {
  return (
    <div className="mt-12">
      {/* First Row - Equal Columns */}
      <div className="mb-12 grid grid-cols-2 items-center gap-12">
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
      <div className="space--gap-14">
        {/* Results Table */}
        <div className="overflow-hidden rounded-lg border border-[#E4E4E7]">
          <table className="w-full table-fixed">
            <thead className="bg-[#CCF5F2]">
              <tr>
                <th className="w-[15%] px-6 py-4 text-left text-xl font-bold text-primary-content">
                  Category
                </th>
                <th className="w-[25%] px-6 py-4 text-left text-xl font-bold text-primary-content">
                  Your Blindspot
                </th>
                <th className="px-6 py-4 text-left text-xl font-bold text-primary-content">
                  Summary
                </th>
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
        </div>
      </div>
    </div>
  );
}

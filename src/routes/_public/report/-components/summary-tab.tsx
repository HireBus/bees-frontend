import ChartSvg from '@/assets/chart.svg?react';

export function SummaryTabHeader() {
  return (
    <div>
      <h1 className="text-[36px] font-bold text-primary-content">Your Blindspotting Report</h1>
      <p className="mt-2 font-light text-secondary-content">
        Your personalized report highlights potential blindspots across different dimensions of
        leadership effectiveness.
      </p>
    </div>
  );
}

export function SummaryTabContent() {
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
              <tr>
                <td className="px-6 py-4 text-xl font-bold text-primary-content">Motive</td>
                <td className="px-6 py-4 font-light">Affiliation</td>
                <td className="px-6 py-4 font-light">
                  Your drive to connect can be so strong that it inadvertently sidelines other
                  priorities.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-xl font-bold text-primary-content">Traits</td>
                <td className="px-6 py-4 font-light">Agreeableness</td>
                <td className="px-6 py-4 font-light">
                  You are likely agreeable and easily trust others compared to those who are
                  comfortable with disagreement and in environments where they may have to play
                  politics or manipulate others. You may be so trusting that you miss potential ill
                  intentions or neglect to critically evaluate someone&apos;s actions or
                  performance.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-xl font-bold text-primary-content">Emotion</td>
                <td className="px-6 py-4 font-light">No Specific Blindspot Found</td>
                <td className="px-6 py-4 font-light">
                  You likely show a solid balance in managing both your own emotions and
                  understanding the emotions of others. How can you build on this balance to
                  maintain your strengths and leverage them for greater success in your role?
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-xl font-bold text-primary-content">Intellect</td>
                <td className="px-6 py-4 font-light">Creativity</td>
                <td className="px-6 py-4 font-light">
                  Others likely respect your ability to think differently and to problem solve.
                  However, your quick mental speed and agility may leave others behind if you
                  aren&apos;t careful to include them in the process. It may be hard for you when
                  others aren&apos;t interested in your ideas, or struggle to understand the
                  connections you make to unconventional or seemingly unrelated ideas and concepts.
                  You may also struggle to balance your creativity within the guidelines, deadlines,
                  and demands of your work environment.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-xl font-bold">Behavior</td>
                <td className="px-6 py-4 font-light">
                  Communication: Low Criticality and High Support
                </td>
                <td className="px-6 py-4 font-light">
                  <p>
                    Low Criticality: You are often tolerant and accepting of others. You focus on
                    what is &quot;right and good&quot; rather than focusing on what is &quot;wrong
                    and bad.&quot; You may be more tolerant of the weaknesses in others. You may be
                    an analytical thinker, but you are less likely to find fault or expect the worst
                    from things, people, and ideas.
                  </p>
                  <p className="mt-4">
                    High Support: Your communication is likely very supportive and kind in tone. You
                    are attentive to what others share with you. You are trusting in nature, and so,
                    might take others at face value. You might not ask critical questions to dig
                    deeper and understand the full picture. You may struggle with holding others
                    accountable and engaging in more difficult conversations.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

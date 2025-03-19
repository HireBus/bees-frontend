export type IdentityTabContentProps = {
  firstName: string;
};

export function IdentityTabContent({ firstName }: IdentityTabContentProps) {
  return (
    <div className="mt-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-primary-content">Identity</h1>
        <p
          className="font-light text-secondary-content"
          dangerouslySetInnerHTML={{
            __html: 'Identity blindspot category overview copy',
          }}
        />
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-bold text-primary-content">
          How to Identify Your Identity Blindspots
        </h2>
        <p className="font-light text-secondary-content">{`${firstName}'s identity Awareness & Action copy from book (this needs to include up front that the assessment can't measure this, also direct them to workbook to go deeper)`}</p>
      </div>

      <div className="mt-14">
        <ResultsTable />
      </div>
    </div>
  );
}

export function ResultsTable() {
  const identityItems = [
    {
      entrepreneurial: 'Innovator',
      generalBusiness: 'Subject Matter Expert',
      personalBlindspot: 'Imposter Syndrome',
    },
    {
      entrepreneurial: 'Business Builder',
      generalBusiness: 'Loyal Follower',
      personalBlindspot: 'Independent Thinker',
    },
    {
      entrepreneurial: 'Leader',
      generalBusiness: 'Tactical Operator/Executer',
      personalBlindspot: 'Rule Follower',
    },
    {
      entrepreneurial: '',
      generalBusiness: 'Leader',
      personalBlindspot: 'Unworthy',
    },
    {
      entrepreneurial: '',
      generalBusiness: '',
      personalBlindspot: 'Entitled',
    },
    {
      entrepreneurial: '',
      generalBusiness: '',
      personalBlindspot: 'Rebel',
    },
    {
      entrepreneurial: '',
      generalBusiness: '',
      personalBlindspot: 'Peacemaker',
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-[#E4E4E7]">
      <table className="w-full table-fixed">
        <thead className="bg-[#CCF5F2]">
          <tr>
            <th className="px-6 py-4 text-left text-xl font-bold text-primary-content">
              Entrepreneurial Identities
            </th>
            <th className="px-6 py-4 text-left text-xl font-bold text-primary-content">
              General Business Identities
            </th>
            <th className="px-6 py-4 text-left text-xl font-bold text-primary-content">
              Personal Blindspots
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E4E4E7]">
          {identityItems.map(item => {
            return (
              <tr key={item.personalBlindspot}>
                <td className="px-6 py-4 font-light text-primary-content">
                  {item.entrepreneurial}
                </td>
                <td className="px-6 py-4 font-light text-primary-content">
                  {item.generalBusiness}
                </td>
                <td className="px-6 py-4 font-light text-primary-content">
                  {item.personalBlindspot}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { BlindspottingReport } from './blindspotting-report/-components/blindspotting-report';

// Define the route for the blindspotting report
export const Route = createFileRoute('/_protected/blindspotting-report')({
  component: BlindspottingReportPage,
});

function BlindspottingReportPage() {
  return (
    <div className="container mx-auto py-6">
      <BlindspottingReport />
    </div>
  );
}

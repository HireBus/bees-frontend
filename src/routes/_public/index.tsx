import { createFileRoute } from '@tanstack/react-router';
import { BehavioralAssessmentForm } from './-components/behavioral-assessment-form';

export const Route = createFileRoute('/_public/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr] bg-[#F8F9FF] px-4 py-8 md:py-12">
      <div className="min-h-28">
        <h1 className="text-2xl font-bold">Blind Spotting</h1>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <BehavioralAssessmentForm />
      </div>
    </div>
  );
}

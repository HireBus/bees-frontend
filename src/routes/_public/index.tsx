import { createFileRoute } from '@tanstack/react-router';
import { BehavioralAssessmentForm } from './-components/behavioral-assessment-form';

export const Route = createFileRoute('/_public/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F8F9FF] px-5">
      <BehavioralAssessmentForm />
    </div>
  );
}

import { cn } from '@/lib/utils';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { AdjectivesAssessment } from './-components/adjectives-assessment';
import { Reviewing } from './-components/reviewing';
import { useAssessmentUserStore } from './-stores/use-assessment-user';

export const Route = createFileRoute('/_public/take/')({
  component: TakePage,
});

function TakePage() {
  const currentUser = useAssessmentUserStore(state => state.user);
  const progress = useAssessmentUserStore(state => state.progress);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative flex h-full w-full flex-col">
      <Reviewing
        className={cn('absolute inset-0 z-0 opacity-0', progress > 0 && 'z-20 opacity-100')}
        progress={progress}
      />
      <AdjectivesAssessment className={cn('z-10 flex', progress > 0 && 'z-0 hidden')} />
    </div>
  );
}

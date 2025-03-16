import { createFileRoute, Navigate } from '@tanstack/react-router';
import { AdjectivesAssessment } from './-components/adjectives-assessment';
import { Reviewing } from './-components/reviewing';
import { useAssessmentUserStore } from './-stores/use-assessment-user';

export const Route = createFileRoute('/_public/take/')({
  component: TakePage,
});

function TakePage() {
  const currentUser = useAssessmentUserStore(state => state.user);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-full w-full flex-col">
      {!currentUser.surveyResultId ? <AdjectivesAssessment /> : <Reviewing />}
    </div>
  );
}

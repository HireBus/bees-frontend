import { type LocalAssessmentUser, LOCAL_STORAGE_KEYS } from '@/constants/local-storage';
import { getLocalStorageItemObject } from '@/utils/local-storage';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { AdjectivesAssessment } from './-components/adjectives-assessment';
import { Reviewing } from './-components/reviewing';

export const Route = createFileRoute('/_public/take/')({
  component: TakePage,
});

function TakePage() {
  const currentUser = getLocalStorageItemObject<LocalAssessmentUser>(
    LOCAL_STORAGE_KEYS.ASSESSMENT_USER
  );

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-full w-full flex-col">
      {!currentUser.surveyResultId ? <AdjectivesAssessment /> : <Reviewing />}
    </div>
  );
}

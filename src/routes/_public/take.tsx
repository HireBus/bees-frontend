import { LOCAL_STORAGE_KEYS, type LocalAssessmentUser } from '@/constants/local-storage';
import { getLocalStorageItemObject } from '@/utils/local-storage';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { AdjectivesAssessmentForm } from './-components/adjectives-assessment-form';

export const Route = createFileRoute('/_public/take')({
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-[49px] px-5 md:pb-[80px]">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-[28px] font-bold">This quick survey typically takes 5-10 minutes.</div>
        <div className="flex items-center pt-3 font-light text-[#52525B]">
          Read each word, and select words that describe how you act most of the time.
        </div>
      </div>
      <AdjectivesAssessmentForm />
    </div>
  );
}

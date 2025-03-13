import { LOCAL_STORAGE_KEYS, type LocalAssessmentUser } from '@/constants/local-storage';
import { getLocalStorageItemObject } from '@/utils/local-storage';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { BehavioralAssessmentForm } from './-components/behavioral-assessment-form';

export const Route = createFileRoute('/_public/')({
  component: IndexPage,
});

function IndexPage() {
  const currentUser = getLocalStorageItemObject<LocalAssessmentUser>(
    LOCAL_STORAGE_KEYS.ASSESSMENT_USER
  );

  if (currentUser) {
    return <Navigate to="/take" />;
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F8F9FF] px-5">
      <BehavioralAssessmentForm />
    </div>
  );
}

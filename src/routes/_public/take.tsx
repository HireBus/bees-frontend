import { LOCAL_STORAGE_KEYS, type LocalAssessmentUser } from '@/constants/local-storage';
import { getLocalStorageItemObject } from '@/utils/local-storage';
import { createFileRoute, Navigate } from '@tanstack/react-router';

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

  return <div>Hello &quot;/_public/take&quot;!</div>;
}

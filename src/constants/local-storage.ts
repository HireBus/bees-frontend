export const LOCAL_STORAGE_KEYS = {
  ASSESSMENT_USER: 'assessment__user',
} as const;

export type LocalAssessmentUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  organization: string;
  accessCode: string;
  agreeToComms: boolean;
};

export type LocalStorageKey = (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

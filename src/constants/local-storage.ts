export const LOCAL_STORAGE_KEYS = {
  ASSESSMENT_USER: 'assessment__user',
} as const;

export type LocalStorageKey = (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

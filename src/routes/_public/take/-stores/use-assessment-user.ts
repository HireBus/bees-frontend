import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { LOCAL_STORAGE_KEYS } from '@/constants/local-storage';
import { removeLocalStorageItem, setLocalStorageItemObject } from '@/utils/local-storage';

export type AssessmentUser = {
  surveyResultId?: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  organization: string;
  accessCode: string;
  agreeToComms: boolean;
};

export type AssessmentUserStoreState = {
  user: AssessmentUser | null;
};

export type AssessmentUserStoreActions = {
  setUser: (user: AssessmentUser) => void;
  updateUser: (userData: Partial<AssessmentUser>) => void;
  clearUser: () => void;
};

export type AssessmentUserStore = AssessmentUserStoreState & AssessmentUserStoreActions;

export const DEFAULT_ASSESSMENT_USER_STORE_STATE: AssessmentUserStoreState = {
  user: null,
};

export const useAssessmentUserStore = create(
  persist(
    immer<AssessmentUserStore>(set => ({
      ...DEFAULT_ASSESSMENT_USER_STORE_STATE,

      /* Actions */
      setUser: user => {
        set(state => {
          state.user = user;
        });
        setLocalStorageItemObject(LOCAL_STORAGE_KEYS.ASSESSMENT_USER, user);
      },

      updateUser: userData => {
        set(state => {
          if (state.user) {
            state.user = { ...state.user, ...userData };
            setLocalStorageItemObject(LOCAL_STORAGE_KEYS.ASSESSMENT_USER, state.user);
          }
        });
      },

      clearUser: () => {
        set(state => {
          state.user = null;
        });
        removeLocalStorageItem(LOCAL_STORAGE_KEYS.ASSESSMENT_USER);
      },
    })),
    {
      name: LOCAL_STORAGE_KEYS.ASSESSMENT_USER,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

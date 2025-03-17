import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { LOCAL_STORAGE_KEYS } from '@/constants/local-storage';

export type AssessmentUser = {
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
  progress: number;
};

export type AssessmentUserStoreActions = {
  reset: () => void;
  setUser: (user: AssessmentUser) => void;
  updateUser: (userData: Partial<AssessmentUser>) => void;
  resetProgress: () => void;
  runProgressUpTo: (progressLimit: number) => void;
};

export type AssessmentUserStore = AssessmentUserStoreState & AssessmentUserStoreActions;

export const DEFAULT_ASSESSMENT_USER_STORE_STATE: AssessmentUserStoreState = {
  user: null,
  progress: 0,
};

export const useAssessmentUserStore = create<AssessmentUserStore>()(
  persist(
    set => ({
      ...DEFAULT_ASSESSMENT_USER_STORE_STATE,

      /* Actions */
      reset: () => {
        set(() => ({
          ...DEFAULT_ASSESSMENT_USER_STORE_STATE,
        }));
      },

      setUser: user => {
        set(() => ({ user, progress: 0 }));
      },

      updateUser: userData => {
        set(state => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      resetProgress: () => {
        set(() => ({ progress: 0 }));
      },

      runProgressUpTo: (progressLimit: number) => {
        const interval = setInterval(() => {
          set(state => {
            const currentProgress = state.progress;
            if (currentProgress < progressLimit) {
              return { progress: currentProgress + 1 };
            }
            clearInterval(interval);
            return state;
          });
        }, 50);
      },
    }),
    {
      name: LOCAL_STORAGE_KEYS.ASSESSMENT_USER,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

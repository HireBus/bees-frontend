import {
  getCodeBatchesSearch,
  getCodesSearch,
  getCodesValidate,
  postCodesGenerate,
} from '@/data/bees';
import { createContext, type ReactNode, useContext } from 'react';

export type BeesApiClientContextState = {
  getCodeBatchesSearch: typeof getCodeBatchesSearch;
  getCodesSearch: typeof getCodesSearch;
  postCodesGenerate: typeof postCodesGenerate;
  getCodesValidate: typeof getCodesValidate;
};

export function createBeesApiClientContext(): BeesApiClientContextState {
  return {
    getCodeBatchesSearch: getCodeBatchesSearch,
    getCodesSearch: getCodesSearch,
    postCodesGenerate: postCodesGenerate,
    getCodesValidate: getCodesValidate,
  };
}

const BeesApiClientContext = createContext<BeesApiClientContextState | null>(null);

export type BeesApiClientProviderProps = {
  children: ReactNode;
  client?: BeesApiClientContextState;
};

export function BeesApiClientProvider({ children, client }: BeesApiClientProviderProps) {
  const apiClient = client ?? createBeesApiClientContext();
  return (
    <BeesApiClientContext.Provider value={apiClient}>{children}</BeesApiClientContext.Provider>
  );
}

export function useBeesApiClientContext() {
  const ctx = useContext(BeesApiClientContext);
  if (!ctx) {
    throw new Error('useBeesApiClientContext must be used within an BeesApiClientProvider.');
  }
  return ctx;
}

import {
  getCodeBatchesSearch,
  getCodesSearch,
  getCodesValidate,
  getPublicCodes,
  postAssessmentsSubmit,
  postCodesGenerate,
} from '@/data/bees';
import { initBeesOpenAPIConfig } from '@/data/bees/openapi-config';
import { createContext, type ReactNode, useContext } from 'react';

export type BeesApiClientContextState = {
  getCodeBatchesSearch: typeof getCodeBatchesSearch;
  getCodesSearch: typeof getCodesSearch;
  postCodesGenerate: typeof postCodesGenerate;
  getCodesValidate: typeof getCodesValidate;
  postAssessmentsSubmit: typeof postAssessmentsSubmit;
  getPublicCodes: typeof getPublicCodes;
};

export function createBeesApiClientContext(): BeesApiClientContextState {
  initBeesOpenAPIConfig();

  return {
    getCodeBatchesSearch: getCodeBatchesSearch,
    getCodesSearch: getCodesSearch,
    postCodesGenerate: postCodesGenerate,
    getCodesValidate: getCodesValidate,
    postAssessmentsSubmit: postAssessmentsSubmit,
    getPublicCodes: getPublicCodes,
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

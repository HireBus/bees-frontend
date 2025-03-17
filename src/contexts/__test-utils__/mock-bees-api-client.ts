import { vi } from 'vitest';
import { type BeesApiClientContextState } from '../bees-api-client';

export const mockBeesApiClient = {
  getCodeBatchesSearch: vi.fn(),
  getCodesSearch: vi.fn(),
  postCodesGenerate: vi.fn(),
  getCodesValidate: vi.fn(),
  postAssessmentsSubmit: vi.fn(),
  getPublicCodes: vi.fn(),
} satisfies BeesApiClientContextState;

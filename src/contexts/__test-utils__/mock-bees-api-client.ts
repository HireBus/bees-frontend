import { vi } from 'vitest';
import { type BeesApiClientContextState } from '../bees-api-client';

export const mockBeesApiClient = {
  getCodeBatchesSearch: vi.fn(),
  getCodesSearch: vi.fn(),
  postCodesGenerate: vi.fn(),
  getCodesValidate: vi.fn(),
} satisfies BeesApiClientContextState;

import { type CodeBatch } from '@/data/bees';
import { v4 as uuidv4 } from 'uuid';

export function makeFakeCodeBatch(overrides?: Partial<CodeBatch>): CodeBatch {
  return {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    edition: `Edition-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    total_generated_codes: Math.floor(Math.random() * 100) + 1,
    generated_by_id: Math.floor(Math.random() * 10) + 1,
    ...overrides,
  };
}

export function makeFakeCodeBatchesResponse(
  count = 3,
  overrides?: Partial<Record<string, unknown>>
) {
  return {
    total_pages: 1,
    current_page: 1,
    next_page: null,
    previous_page: null,
    records: Array.from({ length: count }, () => makeFakeCodeBatch()),
    total_records: count,
    ...overrides,
  };
}

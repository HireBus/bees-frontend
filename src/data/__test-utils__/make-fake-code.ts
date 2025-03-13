import { type Code, type GetCodesSearchResponse } from '@/data/bees';
import { v4 as uuidv4 } from 'uuid';

export function makeFakeCode(overrides?: Partial<Code>): Code {
  return {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    code: `CODE-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    code_used_at: null,
    code_batch_id: uuidv4(),
    code_used_by_id: null,
    ...overrides,
  } satisfies Code;
}

export function makeFakeCodesResponse(
  count = 5,
  overrides?: Partial<Record<string, unknown>>
): GetCodesSearchResponse {
  return {
    total_pages: 1,
    current_page: 1,
    next_page: null,
    previous_page: null,
    records: Array.from({ length: count }, () => makeFakeCode()),
    total_records: count,
    ...overrides,
  } satisfies GetCodesSearchResponse;
}

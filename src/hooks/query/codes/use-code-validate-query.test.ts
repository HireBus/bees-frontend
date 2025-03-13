import { mockBeesApiClient } from '@/contexts/__test-utils__/mock-bees-api-client';
import { makeFakeCode } from '@/data/__test-utils__/make-fake-code';
import { testMocksWrapper } from '@/utils/__test-utils__/test-mocks-wrapper';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCodeValidateQuery, type UseCodeValidateQueryArgs } from './use-code-validate-query';

const mockCode = 'VALID-CODE-123';
const mockValidateResponse = makeFakeCode({ code: mockCode });

function renderTestHook(args: UseCodeValidateQueryArgs) {
  return renderHook(() => useCodeValidateQuery(args), {
    wrapper: testMocksWrapper,
  });
}

describe('useCodeValidateQuery', () => {
  it('should validate a code', async () => {
    mockBeesApiClient.getCodesValidate.mockResolvedValueOnce(mockValidateResponse);

    const { result } = renderTestHook({ code: mockCode });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockBeesApiClient.getCodesValidate).toHaveBeenCalledWith({ code: mockCode });
    expect(mockBeesApiClient.getCodesValidate).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockValidateResponse);
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to validate code');
    mockBeesApiClient.getCodesValidate.mockRejectedValueOnce(error);

    const { result } = renderTestHook({ code: mockCode });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should respect the enabled option', async () => {
    const { result } = renderTestHook({ code: mockCode, enabled: false });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);

    expect(mockBeesApiClient.getCodesValidate).not.toHaveBeenCalled();
  });

  it('should be disabled when code is empty', async () => {
    const { result } = renderTestHook({ code: '' });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);

    expect(mockBeesApiClient.getCodesValidate).not.toHaveBeenCalled();
  });
});

import { mockBeesApiClient } from '@/contexts/__test-utils__/mock-bees-api-client';
import { makeFakeCodesResponse } from '@/data/__test-utils__/make-fake-code';
import { testMocksWrapper } from '@/utils/__test-utils__/test-mocks-wrapper';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCodesQuery, type UseCodesQueryArgs } from './use-codes-query';

const mockSearchParams = {
  page: 1,
  limit: 10,
};

const mockCodesResponse = makeFakeCodesResponse(5);

function renderTestHook(args: UseCodesQueryArgs) {
  return renderHook(() => useCodesQuery(args), {
    wrapper: testMocksWrapper,
  });
}

describe('useCodesQuery', () => {
  it('should fetch codes', async () => {
    mockBeesApiClient.getCodesSearch.mockResolvedValueOnce(mockCodesResponse);

    const { result } = renderTestHook(mockSearchParams);

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockBeesApiClient.getCodesSearch).toHaveBeenCalledWith(mockSearchParams);
    expect(mockBeesApiClient.getCodesSearch).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockCodesResponse);
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to fetch codes');
    mockBeesApiClient.getCodesSearch.mockRejectedValueOnce(error);

    const { result } = renderTestHook(mockSearchParams);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should respect the enabled option', async () => {
    const { result } = renderTestHook({ ...mockSearchParams, enabled: false });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);

    expect(mockBeesApiClient.getCodesSearch).not.toHaveBeenCalled();
  });

  it('should use the correct query function with options', async () => {
    mockBeesApiClient.getCodesSearch.mockResolvedValueOnce(mockCodesResponse);

    // Test with additional options
    const searchParamsWithOptions = {
      ...mockSearchParams,
      search: 'test',
      codeBatchId: '123',
    };

    const { result } = renderTestHook(searchParamsWithOptions);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockBeesApiClient.getCodesSearch).toHaveBeenCalledWith(searchParamsWithOptions);
  });
});

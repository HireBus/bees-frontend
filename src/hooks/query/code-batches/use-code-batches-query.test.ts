import { mockBeesApiClient } from '@/contexts/__test-utils__/mock-bees-api-client';
import { makeFakeCodeBatchesResponse } from '@/data/__test-utils__/make-fake-code-batch';
import { testMocksWrapper } from '@/utils/__test-utils__/test-mocks-wrapper';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCodeBatchesQuery, type UseCodeBatchesQueryArgs } from './use-code-batches-query';

const mockSearchParams = {
  page: 1,
  limit: 10,
};

const mockCodeBatchesResponse = makeFakeCodeBatchesResponse(3);

function renderTestHook(args: UseCodeBatchesQueryArgs) {
  return renderHook(() => useCodeBatchesQuery(args), {
    wrapper: testMocksWrapper,
  });
}

describe('useCodeBatchesQuery', () => {
  it('should fetch code batches', async () => {
    mockBeesApiClient.getCodeBatchesSearch.mockResolvedValueOnce(mockCodeBatchesResponse);

    const { result } = renderTestHook(mockSearchParams);

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockBeesApiClient.getCodeBatchesSearch).toHaveBeenCalledWith(mockSearchParams);
    expect(mockBeesApiClient.getCodeBatchesSearch).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockCodeBatchesResponse);
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to fetch code batches');
    mockBeesApiClient.getCodeBatchesSearch.mockRejectedValueOnce(error);

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

    expect(mockBeesApiClient.getCodeBatchesSearch).not.toHaveBeenCalled();
  });

  it('should use the correct query function', async () => {
    mockBeesApiClient.getCodeBatchesSearch.mockResolvedValueOnce(mockCodeBatchesResponse);

    const { result } = renderTestHook(mockSearchParams);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Verify that the API client was called with the correct parameters
    expect(mockBeesApiClient.getCodeBatchesSearch).toHaveBeenCalledWith(mockSearchParams);
  });
});

import { mockBeesApiClient } from '@/contexts/__test-utils__/mock-bees-api-client';
import { makeFakeCodeBatch } from '@/data/__test-utils__/make-fake-code-batch';
import { testMocksWrapper } from '@/utils/__test-utils__/test-mocks-wrapper';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  useGenerateCodesMutation,
  type UseGenerateCodesMutationArgs,
} from './use-generate-codes-mutation';

const mockGenerateCodesData = {
  requestBody: {
    edition: 'TEST-EDITION',
    count: 10,
  },
};

const mockGenerateCodesResponse = makeFakeCodeBatch({
  edition: 'TEST-EDITION',
  total_generated_codes: 10,
});

function renderTestHook(args: UseGenerateCodesMutationArgs = {}) {
  return renderHook(() => useGenerateCodesMutation(args), {
    wrapper: testMocksWrapper,
  });
}

describe('useGenerateCodesMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate codes', async () => {
    mockBeesApiClient.postCodesGenerate.mockResolvedValueOnce(mockGenerateCodesResponse);

    const { result } = renderTestHook();

    result.current.mutate(mockGenerateCodesData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockBeesApiClient.postCodesGenerate).toHaveBeenCalledWith(mockGenerateCodesData);
    expect(mockBeesApiClient.postCodesGenerate).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockGenerateCodesResponse);
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to generate codes');
    mockBeesApiClient.postCodesGenerate.mockRejectedValueOnce(error);

    const { result } = renderTestHook();

    result.current.mutate(mockGenerateCodesData);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should call onSuccess callback when provided', async () => {
    mockBeesApiClient.postCodesGenerate.mockResolvedValueOnce(mockGenerateCodesResponse);

    const onSuccessMock = vi.fn();
    const { result } = renderTestHook({
      onSuccess: onSuccessMock,
    });

    result.current.mutate(mockGenerateCodesData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(onSuccessMock).toHaveBeenCalledWith(
      mockGenerateCodesResponse,
      mockGenerateCodesData,
      undefined
    );
  });

  it('should call onError callback when provided', async () => {
    const error = new Error('Failed to generate codes');
    mockBeesApiClient.postCodesGenerate.mockRejectedValueOnce(error);

    const onErrorMock = vi.fn();
    const { result } = renderTestHook({
      onError: onErrorMock,
    });

    result.current.mutate(mockGenerateCodesData);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(onErrorMock).toHaveBeenCalledWith(error, mockGenerateCodesData, undefined);
  });
});

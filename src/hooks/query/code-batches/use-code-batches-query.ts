import { useBeesApiClientContext } from '@/contexts/bees-api-client';
import { type GetCodeBatchesSearchData, type GetCodeBatchesSearchResponse } from '@/data/bees';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export type UseCodeBatchesQueryArgs = GetCodeBatchesSearchData & {
  enabled?: boolean;
};

export function useCodeBatchesQuery(
  args: UseCodeBatchesQueryArgs,
  options?: Omit<
    UseQueryOptions<GetCodeBatchesSearchResponse, Error, GetCodeBatchesSearchResponse>,
    'queryKey' | 'queryFn'
  >
) {
  const apiClient = useBeesApiClientContext();

  return useQuery({
    queryKey: ['/code-batches/search', args],
    queryFn: () => apiClient.getCodeBatchesSearch(args),
    enabled: args.enabled ?? true,
    ...options,
  });
}

import { useBeesApiClientContext } from '@/contexts/bees-api-client';
import { type GetCodesSearchData, type GetCodesSearchResponse } from '@/data/bees';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export type UseCodesQueryArgs = GetCodesSearchData & {
  enabled?: boolean;
};

export function useCodesQuery(
  args: UseCodesQueryArgs,
  options?: Omit<
    UseQueryOptions<GetCodesSearchResponse, Error, GetCodesSearchResponse>,
    'queryKey' | 'queryFn'
  >
) {
  const apiClient = useBeesApiClientContext();

  return useQuery({
    queryKey: ['/codes/search', args],
    queryFn: () => apiClient.getCodesSearch(args),
    enabled: args.enabled ?? true,
    ...options,
  });
}

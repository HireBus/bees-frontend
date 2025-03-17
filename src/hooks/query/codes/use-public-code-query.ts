import { useBeesApiClientContext } from '@/contexts/bees-api-client';
import { type GetPublicCodesData, type GetPublicCodesResponse } from '@/data/bees';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export type UsePublicCodeQueryArgs = GetPublicCodesData & {
  enabled?: boolean;
};

export function usePublicCodeQuery(
  args: UsePublicCodeQueryArgs,
  options?: Omit<
    UseQueryOptions<GetPublicCodesResponse, Error, GetPublicCodesResponse>,
    'queryKey' | 'queryFn'
  >
) {
  const apiClient = useBeesApiClientContext();

  return useQuery({
    queryKey: ['/public/codes', args],
    queryFn: () => apiClient.getPublicCodes(args),
    enabled: args.enabled ?? true,
    ...options,
  });
}

import { useBeesApiClientContext } from '@/contexts/bees-api-client';
import { type GetCodesValidateData, type GetCodesValidateResponse } from '@/data/bees';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export type UseCodeValidateQueryArgs = GetCodesValidateData & {
  enabled?: boolean;
};

export function useCodeValidateQuery(
  args: UseCodeValidateQueryArgs,
  options?: Omit<
    UseQueryOptions<GetCodesValidateResponse, Error, GetCodesValidateResponse>,
    'queryKey' | 'queryFn'
  >
) {
  const apiClient = useBeesApiClientContext();

  return useQuery({
    queryKey: ['/codes/validate', args.code],
    queryFn: () => apiClient.getCodesValidate(args),
    enabled: args.enabled ?? !!args.code,
    ...options,
  });
}

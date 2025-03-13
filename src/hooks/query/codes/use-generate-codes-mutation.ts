import { useBeesApiClientContext } from '@/contexts/bees-api-client';
import { type PostCodesGenerateData, type PostCodesGenerateResponse } from '@/data/bees';
import { type MutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

export type UseGenerateCodesMutationArgs = MutationOptions<
  PostCodesGenerateResponse,
  Error,
  PostCodesGenerateData
>;

export function useGenerateCodesMutation(args: UseGenerateCodesMutationArgs = {}) {
  const apiClient = useBeesApiClientContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiClient.postCodesGenerate,
    onSuccess: async (data, params, context) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['/code-batches/search'] });
      queryClient.invalidateQueries({ queryKey: ['/codes/search'] });

      // Call custom onSuccess if provided
      if (args?.onSuccess) return args.onSuccess(data, params, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
    },
    ...args,
  });
}

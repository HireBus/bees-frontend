import { useBeesApiClientContext } from '@/contexts/bees-api-client';
import { type PostAssessmentsSubmitData, type PostAssessmentsSubmitResponse } from '@/data/bees';
import { type MutationOptions, useMutation } from '@tanstack/react-query';

export type UseSubmitAssessmentMutationArgs = MutationOptions<
  PostAssessmentsSubmitResponse,
  Error,
  PostAssessmentsSubmitData
>;

export function useSubmitAssessmentMutation(args: UseSubmitAssessmentMutationArgs = {}) {
  const apiClient = useBeesApiClientContext();

  return useMutation({
    mutationFn: apiClient.postAssessmentsSubmit,
    onSuccess: async (data, params, context) => {
      // Call custom onSuccess if provided
      if (args?.onSuccess) return args.onSuccess(data, params, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
    },
    onMutate: async data => {
      if (args?.onMutate) return args.onMutate(data);
    },
    ...args,
  });
}

import { type ApiError as BeesApiError } from '@/data/bees/core/ApiError';

import { type ZodError } from 'zod';

export type ApiErrors = BeesApiError;

export function parseError(error: Error | ApiErrors) {
  const baseError = error;

  if (baseError.name === 'ApiError') {
    const errorData = (baseError as ApiErrors).body as Record<string, unknown>;

    if (errorData && 'error' in errorData) {
      const deepErrorData = errorData.error as Record<string, unknown>;

      if (deepErrorData && 'issues' in deepErrorData) {
        const errorIssues = deepErrorData.issues as ZodError;
        const errorMessage =
          errorIssues && Array.isArray(errorIssues)
            ? (errorIssues[0]?.message ?? 'Something went wrong')
            : 'Something went wrong';

        return {
          status: (baseError as ApiErrors).status,
          message: errorMessage,
          name: deepErrorData.name ?? baseError.name,
        };
      }
    }

    if (errorData && 'issues' in errorData) {
      const errorIssues = errorData.issues as ZodError;
      const errorMessage =
        errorIssues && Array.isArray(errorIssues)
          ? (errorIssues[0]?.message ?? 'Something went wrong')
          : 'Something went wrong';

      return {
        status: (baseError as ApiErrors).status,
        message: errorMessage,
        name: errorData.name ?? baseError.name,
      };
    }

    if (errorData && 'message' in errorData) {
      return {
        status: (baseError as ApiErrors).status,
        message: errorData.message as string,
        name: baseError.name,
      };
    }

    return {
      status: (baseError as ApiErrors)?.status,
      message: baseError.message,
      name: baseError.name,
    };
  }

  return {
    message: baseError.message,
    name: baseError.name,
  };
}

import { type ApiError as BeesApiError } from '@/data/bees/core/ApiError';
import { describe, expect, it } from 'vitest';
import { parseError } from './error-parser';

// Mock ApiError class to test various error structures
class MockApiError extends Error {
  url: string;
  status: number;
  statusText: string;
  body: unknown;
  request: unknown;

  constructor(body: unknown, status = 400, message = 'API Error') {
    super(message);
    this.name = 'ApiError';
    this.url = 'https://api.example.com';
    this.status = status;
    this.statusText = 'Bad Request';
    this.body = body;
    this.request = {};
  }
}

describe('parseError', () => {
  it('should handle standard Error objects', () => {
    const error = new Error('Standard error message');
    const result = parseError(error);

    expect(result).toEqual({
      message: 'Standard error message',
      name: 'Error',
    });
  });

  it('should handle ApiError with nested error.issues', () => {
    const apiError = new MockApiError({
      error: {
        issues: [{ message: 'Validation failed' }],
      },
    });

    const result = parseError(apiError as unknown as BeesApiError);

    expect(result).toEqual({
      status: 400,
      message: 'Validation failed',
      name: 'ApiError',
    });
  });

  it('should handle ApiError with nested error.issues but no message', () => {
    const apiError = new MockApiError({
      error: {
        issues: [],
      },
    });

    const result = parseError(apiError as unknown as BeesApiError);

    expect(result).toEqual({
      status: 400,
      message: 'Something went wrong',
      name: 'ApiError',
    });
  });

  it('should handle ApiError with issues directly', () => {
    const apiError = new MockApiError({
      issues: [{ message: 'Direct validation error' }],
      name: 'ValidationError',
    });

    const result = parseError(apiError as unknown as BeesApiError);

    expect(result).toEqual({
      status: 400,
      message: 'Direct validation error',
      name: 'ValidationError',
    });
  });

  it('should handle ApiError with issues but no message', () => {
    const apiError = new MockApiError({
      issues: [],
      name: 'ValidationError',
    });

    const result = parseError(apiError as unknown as BeesApiError);

    expect(result).toEqual({
      status: 400,
      message: 'Something went wrong',
      name: 'ValidationError',
    });
  });

  it('should handle ApiError with just a message', () => {
    const apiError = new MockApiError({
      message: 'Simple error message',
    });

    const result = parseError(apiError as unknown as BeesApiError);

    expect(result).toEqual({
      status: 400,
      message: 'Simple error message',
      name: 'ApiError',
    });
  });

  it('should handle ApiError with no specific error details', () => {
    const apiError = new MockApiError({});
    apiError.message = 'Basic API error';

    const result = parseError(apiError as unknown as BeesApiError);

    expect(result).toEqual({
      status: 400,
      message: 'Basic API error',
      name: 'ApiError',
    });
  });
});

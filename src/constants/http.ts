export const X_HEADERS = {
  IdToken: 'x-id-token',
} as const;

export type XHeaderType = (typeof X_HEADERS)[keyof typeof X_HEADERS];

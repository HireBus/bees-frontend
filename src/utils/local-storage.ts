import { type LocalStorageKey } from '@/constants/local-storage';

export function getLocalStorageItem(key: LocalStorageKey): string | null {
  const item = localStorage.getItem(key);
  return item ?? null;
}

export function getLocalStorageItemObject<TData extends Record<string, unknown>>(
  key: string
): TData | null {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function setLocalStorageItemObject<TData extends Record<string, unknown>>(
  key: string,
  value: TData
) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorageItem(key: string) {
  localStorage.removeItem(key);
}

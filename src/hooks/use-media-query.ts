import { useEffect, useState } from 'react';

/**
 * Custom hook to check if a media query matches
 * @param query The media query to check (e.g., '(max-width: 768px)')
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Set initial value
    const media = window.matchMedia(query);
    setMatches(media.matches);

    // Create an event listener to update matches when the media query changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener to the media query
    media.addEventListener('change', listener);

    // Clean up
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}

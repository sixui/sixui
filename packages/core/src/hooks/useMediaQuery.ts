import { useEffect, useState } from 'react';

export interface IUseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

type IMediaQueryCallback = (event: { matches: boolean; media: string }) => void;

/**
 * Older versions of Safari (shipped withCatalina and before) do not support
 * addEventListener on matchMedia
 * https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
 * */
const attachMediaListener = (
  query: MediaQueryList,
  callback: IMediaQueryCallback,
) => {
  try {
    query.addEventListener('change', callback);
    return () => {
      query.removeEventListener('change', callback);
    };
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _error
  ) {
    query.addListener(callback);
    return () => {
      query.removeListener(callback);
    };
  }
};

const getInitialValue = (query: string, initialValue?: boolean): boolean => {
  if (typeof initialValue === 'boolean') {
    return initialValue;
  }

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    return window.matchMedia(query).matches;
  }

  return false;
};

export const useMediaQuery = (
  query: string,
  initialValue?: boolean,
  { getInitialValueInEffect }: IUseMediaQueryOptions = {
    getInitialValueInEffect: true,
  },
): boolean => {
  const [matches, setMatches] = useState(
    getInitialValueInEffect ? initialValue : getInitialValue(query),
  );
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia(query);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMatches(mediaQuery.matches);

      return attachMediaListener(mediaQuery, (event) => {
        setMatches(event.matches);
      });
    } catch (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _error
    ) {
      // Safari iframe compatibility issue
      return undefined;
    }
  }, [query]);

  return matches || false;
};

import { useEffect, useMemo, useRef, useState } from 'react';

import {
  getResponsiveRules,
  type IResponsiveRule,
  type IWindowSizeClassContainerName,
} from '~/helpers/getResponsiveRules';
import { useThemeContext } from '~/components/Theme';

type IWIndowSizeClassContainerMap = Partial<
  Record<IWindowSizeClassContainerName, true>
>;

export type IUseWindowSizeClassResult =
  | IWIndowSizeClassContainerMap
  | undefined;

type IMediaQueryCallback = (event: { matches: boolean; media: string }) => void;

const arrayToMap = (
  array: Array<IWindowSizeClassContainerName>,
): IWIndowSizeClassContainerMap =>
  array.reduce(
    (acc, key) => ({
      ...acc,
      [key]: true,
    }),
    {} as Record<IWindowSizeClassContainerName, true>,
  );

const getInitialValue = (
  rules: Array<IResponsiveRule>,
): IUseWindowSizeClassResult => {
  if (typeof window === 'undefined' || !('matchMedia' in window)) {
    return undefined;
  }

  const matchingRule = rules.find(
    (rule) => window.matchMedia(rule.query).matches,
  );

  return matchingRule ? arrayToMap(matchingRule?.containerNames) : undefined;
};

export const useWindowSizeClass = (): IUseWindowSizeClassResult => {
  const { theme } = useThemeContext();
  const windowSizeClasses = theme.windowSizeClasses;

  const listenersRef = useRef<
    Array<{
      query: MediaQueryList;
      callback: IMediaQueryCallback;
    }>
  >();
  const rules = useMemo(
    () => getResponsiveRules(windowSizeClasses),
    [windowSizeClasses],
  );

  const [matches, setMatches] = useState<IUseWindowSizeClassResult | undefined>(
    getInitialValue(rules),
  );

  useEffect(() => {
    if (!('matchMedia' in window)) {
      return;
    }

    listenersRef.current = rules.map((rule) => {
      const query = window.matchMedia(rule.query);
      if (query.matches) {
        setMatches(arrayToMap(rule.containerNames));
      }

      const callback: IMediaQueryCallback = (event) => {
        if (event.matches) {
          setMatches(arrayToMap(rule.containerNames));
        }
      };

      query.addEventListener('change', callback);

      return {
        query,
        callback,
      };
    });

    return () =>
      listenersRef.current?.forEach((query) =>
        query.query.removeEventListener('change', query.callback),
      );
  }, [rules]);

  return matches;
};

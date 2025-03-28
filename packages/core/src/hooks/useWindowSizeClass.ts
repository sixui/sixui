import { useEffect, useMemo, useRef, useState } from 'react';

import type {
  IResponsiveRule,
  IWindowSizeClassContainerName,
} from '~/utils/css/getResponsiveRules';
import { useThemeContext } from '~/components/Theme/Theme.context';
import { getResponsiveRules } from '~/utils/css/getResponsiveRules';

export type IUseWindowSizeClassResult = Partial<
  Record<IWindowSizeClassContainerName, true>
>;

export type IUseWindowSizeClassProps = {
  window?: Window;
};

// TODO: test

type IMediaQueryCallback = (event: { matches: boolean; media: string }) => void;

const arrayToMap = (
  array: Array<IWindowSizeClassContainerName>,
): IUseWindowSizeClassResult =>
  array.reduce(
    (acc, key) => ({
      ...acc,
      [key]: true,
    }),
    {} as Record<IWindowSizeClassContainerName, true>,
  );

const getInitialValue = (
  rules: Array<IResponsiveRule>,
  customWindow?: Window,
): IUseWindowSizeClassResult | undefined => {
  if (typeof window === 'undefined' || !('matchMedia' in window)) {
    return undefined;
  }

  const container = customWindow ?? window;
  const matchingRule = rules.find(
    (rule) => container.matchMedia(rule.query).matches,
  );

  return matchingRule ? arrayToMap(matchingRule.containerNames) : undefined;
};

export const useWindowSizeClass = (
  props?: IUseWindowSizeClassProps,
): IUseWindowSizeClassResult | undefined => {
  const { theme } = useThemeContext();
  const windowSizeClasses = theme.windowSizeClasses;
  const container =
    props?.window ?? (typeof window !== 'undefined' ? window : undefined);

  const listenersRef = useRef<
    Array<{
      query: MediaQueryList;
      callback: IMediaQueryCallback;
    }>
  >(null);
  const rules = useMemo(
    () => getResponsiveRules(windowSizeClasses),
    [windowSizeClasses],
  );

  const [matches, setMatches] = useState<IUseWindowSizeClassResult | undefined>(
    getInitialValue(rules),
  );

  useEffect(() => {
    if ((container && !('matchMedia' in container)) || !container) {
      return;
    }

    listenersRef.current = rules.map((rule) => {
      const query = container.matchMedia(rule.query);
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
      listenersRef.current?.forEach((query) => {
        query.query.removeEventListener('change', query.callback);
      });
  }, [rules, container]);

  return matches;
};

import { useCallback, useRef, useState } from 'react';

import type { IAny } from '~/utils';

export interface IUseIntersectionResult<T> {
  ref: React.RefCallback<T | null>;
  entry: IntersectionObserverEntry | null;
}

export const useIntersection = <T extends HTMLElement = IAny>(
  props?: IntersectionObserverInit,
): IUseIntersectionResult<T> => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const ref: React.RefCallback<T | null> = useCallback(
    (element) => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }

      if (element === null) {
        setEntry(null);
        return;
      }

      observer.current = new IntersectionObserver(
        ([_entry]) => {
          setEntry(_entry ?? null);
        },
        {
          rootMargin: props?.rootMargin,
          root: props?.root,
          threshold: props?.threshold,
        },
      );

      observer.current.observe(element);
    },
    [props?.rootMargin, props?.root, props?.threshold],
  );

  return { ref, entry };
};

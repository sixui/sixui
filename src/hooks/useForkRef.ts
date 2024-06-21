import { useMemo } from 'react';

import { setRef } from '@/helpers/setRef';

// https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/useForkRef/useForkRef.ts
// https://ollylut.medium.com/what-is-useforkref-hook-4be1c85d2d1b

/**
 * @deprecated use `useMergeRefs()` from `@floating-ui/react` instead
 */
export const useForkRef = <TInstance>(
  ...refs: Array<React.Ref<TInstance> | undefined>
): React.RefCallback<TInstance> | null => {
  /**
   * This will create a new function if the refs passed to this hook change and
   * are all defined. This means react will call the old forkRef with `null` and
   * the new forkRef with the ref. Cleanup naturally emerges from this behavior.
   */
  return useMemo(() => {
    if (refs.every((ref) => ref === null)) {
      return null;
    }

    return (instance) => {
      refs.forEach((ref) => setRef(ref, instance));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
};

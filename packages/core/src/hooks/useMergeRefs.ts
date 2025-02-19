import type { Ref, RefCallback } from 'react';
import { useMemo } from 'react';

import { mergeRefs } from '~/utils/mergeRefs';

export const useMergeRefs = <TInstance>(
  ...refs: Array<Ref<TInstance> | undefined>
): RefCallback<TInstance> | null =>
  useMemo(
    () => mergeRefs(...refs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );

import { useMemo } from 'react';

import { mergeRefs } from '~/utils/mergeRefs';

export const useMergeRefs = <TInstance>(
  ...refs: Array<React.Ref<TInstance> | undefined>
): React.RefCallback<TInstance> | null =>
  useMemo(
    () => mergeRefs(...refs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );

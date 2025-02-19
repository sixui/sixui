import type { Ref, RefCallback } from 'react';

export const mergeRefs = <TInstance>(
  ...refs: Array<Ref<TInstance> | undefined>
): RefCallback<TInstance> | null => {
  if (refs.every((ref) => ref == null)) {
    return null;
  }

  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        // eslint-disable-next-line no-param-reassign
        ref.current = value;
      }
    });
  };
};

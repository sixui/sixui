export const mergeRefs = <TInstance>(
  ...refs: Array<React.Ref<TInstance> | undefined>
): React.RefCallback<TInstance> | null => {
  if (refs.every((ref) => ref == null)) {
    return null;
  }

  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        // eslint-disable-next-line no-param-reassign
        (ref as React.MutableRefObject<TInstance | null>).current = value;
      }
    });
  };
};

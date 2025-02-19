import { useMemo, useRef, useState } from 'react';

export const useSet = <T>(initialValue: Array<T>): Set<T> => {
  const [_, setTriggerRender] = useState(0);
  const set = useRef(new Set<T>(initialValue));

  return useMemo(
    () =>
      ({
        add(item) {
          if (set.current.has(item)) {
            return;
          }
          set.current.add(item);
          setTriggerRender((i) => i + 1);
        },
        delete(item) {
          if (!set.current.has(item)) {
            return;
          }
          set.current.delete(item);
          setTriggerRender((i) => i + 1);
        },
        clear() {
          if (set.current.size === 0) {
            return;
          }
          set.current.clear();
          setTriggerRender((i) => i + 1);
        },
        has: (item) => set.current.has(item),
        keys: () => set.current.keys(),
        values: () => set.current.values(),
        forEach: (...args) => {
          set.current.forEach(...args);
        },
        [Symbol.iterator]: () => set.current.values(),
        get size() {
          return set.current.size;
        },
      }) as Set<T>,
    [setTriggerRender],
  );
};

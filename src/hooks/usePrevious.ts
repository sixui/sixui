import { useEffect, useRef } from 'react';

export const usePrevious = <TValueType>(
  value: TValueType,
): TValueType | undefined => {
  const valueRef = useRef<TValueType>(undefined);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
};

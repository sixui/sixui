import { useEffect, useRef } from 'react';

export const usePrevious = <IValueType>(
  value: IValueType,
): IValueType | undefined => {
  const valueRef = useRef<IValueType>();

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
};

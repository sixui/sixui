import * as React from 'react';

export const usePrevious = <IValueType>(
  value: IValueType,
): IValueType | undefined => {
  const valueRef = React.useRef<IValueType>();

  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
};

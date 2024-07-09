import { forwardRef } from 'react';

import type { ICircularProgressIndicatorProps } from './CircularProgressIndicatorProps';
import { DeterminateCircularProgressIndicator } from './DeterminateCircularProgressIndicator';
import { IndeterminateCircularProgressIndicator } from './IndeterminateCircularProgressIndicator';

export const CircularProgressIndicator = forwardRef<
  HTMLInputElement,
  ICircularProgressIndicatorProps
>(function CircularProgressIndicator(props, forwardedRef) {
  const { value } = props;

  return value === undefined ? (
    <IndeterminateCircularProgressIndicator {...props} ref={forwardedRef} />
  ) : (
    <DeterminateCircularProgressIndicator
      {...props}
      ref={forwardedRef}
      value={value}
    />
  );
});

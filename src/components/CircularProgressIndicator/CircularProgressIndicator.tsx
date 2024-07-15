import { forwardRef } from 'react';

import type { ICircularProgressIndicatorProps } from './CircularProgressIndicator.types';
import { DeterminateCircularProgressIndicator } from '@/components/DeterminateCircularProgressIndicator';
import { IndeterminateCircularProgressIndicator } from '@/components/IndeterminateCircularProgressIndicator';

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

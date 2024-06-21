import { forwardRef } from 'react';

import type { IContainerProps, IOmit, IMakeOptional } from '@/helpers/types';
import type { IDeterminateCircularProgressIndicatorProps } from './DeterminateCircularProgressIndicator';
import type { IDeterminateCircularProgressIndicatorStyleKey } from './DeterminateCircularProgressIndicator.styledefs';
import type { IIndeterminateCircularProgressIndicatorProps } from './IndeterminateCircularProgressIndicator';
import type { IIndeterminateCircularProgressIndicatorStyleKey } from './IndeterminateCircularProgressIndicator.styledefs';
import { DeterminateCircularProgressIndicator } from './DeterminateCircularProgressIndicator';
import { IndeterminateCircularProgressIndicator } from './IndeterminateCircularProgressIndicator';
import { ICircularProgressIndicatorStyleKey } from './CircularProgressIndicator.styledefs';

export type ICircularProgressIndicatorProps = IContainerProps<
  | ICircularProgressIndicatorStyleKey
  | IDeterminateCircularProgressIndicatorStyleKey
  | IIndeterminateCircularProgressIndicatorStyleKey
> &
  IMakeOptional<
    IOmit<IDeterminateCircularProgressIndicatorProps, 'styles'>,
    'value'
  > &
  IOmit<IIndeterminateCircularProgressIndicatorProps, 'styles'>;

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

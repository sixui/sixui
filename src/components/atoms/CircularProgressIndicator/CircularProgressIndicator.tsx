import type { IContainerProps } from '@/components/utils/Container';
import type { IMakeOptional } from '@/helpers/types';
import type { IDeterminateCircularProgressIndicatorProps } from './DeterminateCircularProgressIndicator';
import type { IDeterminateCircularProgressIndicatorStyleKey } from './DeterminateCircularProgressIndicator.styledefs';
import type { IIndeterminateCircularProgressIndicatorProps } from './IndeterminateCircularProgressIndicator';
import type { IIndeterminateCircularProgressIndicatorStyleKey } from './IndeterminateCircularProgressIndicator.styledefs';
import { DeterminateCircularProgressIndicator } from './DeterminateCircularProgressIndicator';
import { IndeterminateCircularProgressIndicator } from './IndeterminateCircularProgressIndicator';
import { ICircularProgressIndicatorStyleKey } from './CircularProgressIndicator.styledefs';
import { forwardRef } from 'react';

export type ICircularProgressIndicatorProps = IContainerProps<
  | ICircularProgressIndicatorStyleKey
  | IDeterminateCircularProgressIndicatorStyleKey
  | IIndeterminateCircularProgressIndicatorStyleKey
> &
  IMakeOptional<
    Omit<IDeterminateCircularProgressIndicatorProps, 'styles'>,
    'value'
  > &
  Omit<IIndeterminateCircularProgressIndicatorProps, 'styles'>;

export const CircularProgressIndicator = forwardRef<
  HTMLInputElement,
  ICircularProgressIndicatorProps
>(function CircularProgressIndicator(props, ref) {
  const { value } = props;

  return value === undefined ? (
    <IndeterminateCircularProgressIndicator {...props} ref={ref} />
  ) : (
    <DeterminateCircularProgressIndicator {...props} ref={ref} value={value} />
  );
});

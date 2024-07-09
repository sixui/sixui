import type { IContainerProps, IOmit, IMakeOptional } from '@/helpers/types';
import type { IDeterminateCircularProgressIndicatorStyleKey } from './DeterminateCircularProgressIndicator.styledefs';
import type { IIndeterminateCircularProgressIndicatorStyleKey } from './IndeterminateCircularProgressIndicator.styledefs';
import type { ICircularProgressIndicatorStyleKey } from './CircularProgressIndicator.styledefs';
import type { IDeterminateCircularProgressIndicatorProps } from './DeterminateCircularProgressIndicatorProps';
import type { IIndeterminateCircularProgressIndicatorProps } from './IndeterminateCircularProgressIndicatorProps';

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

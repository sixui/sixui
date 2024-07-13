import type { IContainerProps, IOmit, IMakeOptional } from '@/helpers/types';
import type {
  IDeterminateCircularProgressIndicatorProps,
  IDeterminateCircularProgressIndicatorStyleKey,
} from '@/components/atoms/DeterminateCircularProgressIndicator';
import type {
  IIndeterminateCircularProgressIndicatorProps,
  IIndeterminateCircularProgressIndicatorStyleKey,
} from '@/components/atoms/IndeterminateCircularProgressIndicator';
import type { ICircularProgressIndicatorStyleKey } from './CircularProgressIndicator.styles';

export type ICircularProgressIndicatorSize = 'md' | 'lg';

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

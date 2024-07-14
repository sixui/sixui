import type { IContainerProps, IOmit, IMakeOptional } from '@/helpers/types';
import type {
  IDeterminateCircularProgressIndicatorProps,
  IDeterminateCircularProgressIndicatorStylesKey,
} from '@/components/atoms/DeterminateCircularProgressIndicator';
import type {
  IIndeterminateCircularProgressIndicatorProps,
  IIndeterminateCircularProgressIndicatorStyleKey,
} from '@/components/atoms/IndeterminateCircularProgressIndicator';
import type { ICircularProgressIndicatorStylesKey } from './CircularProgressIndicator.styles';

export type ICircularProgressIndicatorSize = 'md' | 'lg';

export type ICircularProgressIndicatorProps = IContainerProps<
  | ICircularProgressIndicatorStylesKey
  | IDeterminateCircularProgressIndicatorStylesKey
  | IIndeterminateCircularProgressIndicatorStyleKey
> &
  IMakeOptional<
    IOmit<IDeterminateCircularProgressIndicatorProps, 'styles'>,
    'value'
  > &
  IOmit<IIndeterminateCircularProgressIndicatorProps, 'styles'>;

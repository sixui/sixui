import type { IContainerProps, IOmit, IMakeOptional } from '~/helpers/types';
import type {
  IDeterminateCircularProgressIndicatorProps,
  IDeterminateCircularProgressIndicatorStylesKey,
} from '../DeterminateCircularProgressIndicator';
import type {
  IIndeterminateCircularProgressIndicatorProps,
  IIndeterminateCircularProgressIndicatorStyleKey,
} from '../IndeterminateCircularProgressIndicator';
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

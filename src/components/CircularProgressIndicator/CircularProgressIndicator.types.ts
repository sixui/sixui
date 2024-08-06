import type { IBaseProps } from '../Base';
import type { IOmit, IMakeOptional } from '~/helpers/types';
import type {
  IDeterminateCircularProgressIndicatorProps,
  IDeterminateCircularProgressIndicatorStylesKey,
} from '../DeterminateCircularProgressIndicator';
import type {
  IIndeterminateCircularProgressIndicatorProps,
  IIndeterminateCircularProgressIndicatorStyleKey,
} from '../IndeterminateCircularProgressIndicator';
import type { ICircularProgressIndicatorStylesKey } from './CircularProgressIndicator.styles';

export type ICircularProgressIndicatorProps = IBaseProps<
  | ICircularProgressIndicatorStylesKey
  | IDeterminateCircularProgressIndicatorStylesKey
  | IIndeterminateCircularProgressIndicatorStyleKey
> &
  IMakeOptional<
    IOmit<IDeterminateCircularProgressIndicatorProps, 'styles'>,
    'value'
  > &
  IOmit<IIndeterminateCircularProgressIndicatorProps, 'styles'>;

import type { IContainerProps } from '~/helpers/types';
import type { ICircularProgressIndicatorSize } from '../CircularProgressIndicator';
import type { IIndeterminateCircularProgressIndicatorStyleKey } from './IndeterminateCircularProgressIndicator.styles';

export type IIndeterminateCircularProgressIndicatorProps =
  IContainerProps<IIndeterminateCircularProgressIndicatorStyleKey> &
    Pick<React.AriaAttributes, 'aria-label'> & {
      size?: ICircularProgressIndicatorSize;
      disabled?: boolean;
      children?: React.ReactNode;
    };

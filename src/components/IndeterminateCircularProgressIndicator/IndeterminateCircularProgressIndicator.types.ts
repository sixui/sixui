import type { IBaseProps } from '../Base';
import type { ICircularProgressIndicatorSize } from '../CircularProgressIndicator';
import type { IIndeterminateCircularProgressIndicatorStyleKey } from './IndeterminateCircularProgressIndicator.styles';

export type IIndeterminateCircularProgressIndicatorProps =
  IBaseProps<IIndeterminateCircularProgressIndicatorStyleKey> &
    Pick<React.AriaAttributes, 'aria-label'> & {
      size?: ICircularProgressIndicatorSize;
      disabled?: boolean;
      children?: React.ReactNode;
    };

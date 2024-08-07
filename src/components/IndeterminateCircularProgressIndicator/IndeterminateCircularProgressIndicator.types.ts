import type { IBaseProps } from '../Base';
import type { IIndeterminateCircularProgressIndicatorStyleKey } from './IndeterminateCircularProgressIndicator.styles';

export type IIndeterminateCircularProgressIndicatorProps =
  IBaseProps<IIndeterminateCircularProgressIndicatorStyleKey> &
    Pick<React.AriaAttributes, 'aria-label'> & {
      disabled?: boolean;
      children?: React.ReactNode;
    };

import type { IContainerProps } from '@/helpers/types';
import type { IIndeterminateCircularProgressIndicatorStyleKey } from './IndeterminateCircularProgressIndicator.styledefs';
import type { ICircularProgressIndicatorSize } from './CircularProgressIndicator.styledefs';

export type IIndeterminateCircularProgressIndicatorProps =
  IContainerProps<IIndeterminateCircularProgressIndicatorStyleKey> &
    Pick<React.AriaAttributes, 'aria-label'> & {
      size?: ICircularProgressIndicatorSize;
      disabled?: boolean;
      children?: React.ReactNode;
    };

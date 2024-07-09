import type { IContainerProps } from '@/helpers/types';
import type { ICircularProgressIndicatorSize } from './CircularProgressIndicator.styledefs';
import type { IDeterminateCircularProgressIndicatorStyleKey } from './DeterminateCircularProgressIndicator.styledefs';

export type IDeterminateCircularProgressIndicatorProps =
  IContainerProps<IDeterminateCircularProgressIndicatorStyleKey> &
    Pick<React.AriaAttributes, 'aria-label'> & {
      value: number;
      withLabel?: boolean;
      min?: number;
      max?: number;
      zeroBased?: boolean;
      labelFormatter?: (value: number) => string;
      size?: ICircularProgressIndicatorSize;
      disabled?: boolean;
      children?: React.ReactNode;
    };

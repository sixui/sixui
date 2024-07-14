import type { IContainerProps } from '@/helpers/types';
import type { ICircularProgressIndicatorSize } from '@/components/atoms/CircularProgressIndicator';
import type { IDeterminateCircularProgressIndicatorStylesKey } from './DeterminateCircularProgressIndicator.styles';

export type IDeterminateCircularProgressIndicatorProps =
  IContainerProps<IDeterminateCircularProgressIndicatorStylesKey> &
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

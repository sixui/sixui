import type { IBaseProps } from '../Base';
import type { ICircularProgressIndicatorSize } from '../CircularProgressIndicator';
import type { IDeterminateCircularProgressIndicatorStylesKey } from './DeterminateCircularProgressIndicator.styles';

export type IDeterminateCircularProgressIndicatorProps =
  IBaseProps<IDeterminateCircularProgressIndicatorStylesKey> &
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

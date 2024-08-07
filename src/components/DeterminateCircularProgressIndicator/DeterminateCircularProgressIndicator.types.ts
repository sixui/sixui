import type { IBaseProps } from '../Base';
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
      disabled?: boolean;
      children?: React.ReactNode;
    };

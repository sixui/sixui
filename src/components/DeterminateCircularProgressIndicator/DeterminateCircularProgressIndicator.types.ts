import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type {
  determinateCircularProgressIndicatorStyles,
  IDeterminateCircularProgressIndicatorStylesFactory,
} from './DeterminateCircularProgressIndicator.css';

export type IDeterminateCircularProgressIndicatorOwnProps = {
  value: number;
  withLabel?: boolean;
  min?: number;
  max?: number;
  zeroBased?: boolean;
  labelFormatter?: (value: number) => string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export interface IDeterminateCircularProgressIndicatorProps
  extends IBoxProps,
    IStylesProps<IDeterminateCircularProgressIndicatorStylesFactory>,
    IDeterminateCircularProgressIndicatorOwnProps {}

export type IDeterminateCircularProgressIndicatorFactory = IComponentFactory<{
  props: IDeterminateCircularProgressIndicatorProps;
  ref: HTMLDivElement;
  styles: typeof determinateCircularProgressIndicatorStyles;
}>;

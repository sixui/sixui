import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type {
  indeterminateCircularProgressIndicatorStyles,
  IIndeterminateCircularProgressIndicatorStylesFactory,
} from './IndeterminateCircularProgressIndicator.css';

export type IIndeterminateCircularProgressIndicatorOwnProps = {
  disabled?: boolean;
  children?: React.ReactNode;
};

export interface IIndeterminateCircularProgressIndicatorProps
  extends IBoxProps,
    IStylesProps<IIndeterminateCircularProgressIndicatorStylesFactory>,
    IIndeterminateCircularProgressIndicatorOwnProps {}

export type IIndeterminateCircularProgressIndicatorFactory = IComponentFactory<{
  props: IIndeterminateCircularProgressIndicatorProps;
  ref: HTMLDivElement;
  styles: typeof indeterminateCircularProgressIndicatorStyles;
}>;

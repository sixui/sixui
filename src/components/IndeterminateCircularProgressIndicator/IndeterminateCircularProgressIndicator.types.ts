import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  indeterminateCircularProgressIndicatorTheme,
  IIndeterminateCircularProgressIndicatorThemeFactory,
} from './IndeterminateCircularProgressIndicator.css';

export type IIndeterminateCircularProgressIndicatorOwnProps = {
  disabled?: boolean;
  children?: React.ReactNode;
};

export interface IIndeterminateCircularProgressIndicatorProps
  extends IBoxProps,
    IStylesProps<IIndeterminateCircularProgressIndicatorThemeFactory>,
    IIndeterminateCircularProgressIndicatorOwnProps {}

export type IIndeterminateCircularProgressIndicatorFactory = IComponentFactory<{
  props: IIndeterminateCircularProgressIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof indeterminateCircularProgressIndicatorTheme;
}>;

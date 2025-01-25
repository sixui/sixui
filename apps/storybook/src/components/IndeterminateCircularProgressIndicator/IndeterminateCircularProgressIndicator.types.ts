import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  IIndeterminateCircularProgressIndicatorThemeFactory,
  indeterminateCircularProgressIndicatorTheme,
} from './IndeterminateCircularProgressIndicator.css';

export interface IIndeterminateCircularProgressIndicatorOwnProps {
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface IIndeterminateCircularProgressIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IIndeterminateCircularProgressIndicatorThemeFactory>,
    IIndeterminateCircularProgressIndicatorOwnProps {}

export type IIndeterminateCircularProgressIndicatorFactory = IComponentFactory<{
  props: IIndeterminateCircularProgressIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof indeterminateCircularProgressIndicatorTheme;
}>;

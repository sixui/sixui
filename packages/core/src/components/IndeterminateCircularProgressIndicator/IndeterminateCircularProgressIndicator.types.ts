import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
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

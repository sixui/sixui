import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IPaperOwnProps } from '../Paper';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { buttonTheme, IButtonThemeFactory } from './Button.css';

export type IButtonVariant =
  | 'elevated'
  | 'filled'
  | 'filledTonal'
  | 'outlined'
  | 'text'
  | 'danger'
  | 'snackbar';

export type IButtonOwnProps = {
  icon?: React.ReactNode;
  trailingIcon?: boolean;
  loading?: boolean;
  loadingAnimation?: 'progressIndicator' | 'halfSpin' | 'none';
  loadingText?: string;
};

export interface IButtonProps
  extends IBoxProps,
    IPaperOwnProps,
    IComponentThemeProps<IButtonThemeFactory>,
    IButtonBaseOwnProps,
    IButtonOwnProps {}

export type IButtonFactory = IPolymorphicComponentFactory<{
  props: IButtonProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof buttonTheme;
  variant: IButtonVariant;
}>;

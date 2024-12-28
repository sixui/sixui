import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { IPaperOwnProps } from '../Paper';
import type { buttonTheme, IButtonThemeFactory } from './Button.css';

export type IButtonVariant =
  | 'elevated'
  | 'filled'
  | 'filledTonal'
  | 'outlined'
  | 'text'
  | 'danger'
  | 'snackbar'
  | 'fluid';

export interface IButtonOwnProps extends IButtonBaseOwnProps {
  loading?: boolean;
  loadingAnimation?: 'progressIndicator' | 'halfSpin' | 'none';
  loadingText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  hasLeading?: boolean;
  hasTrailing?: boolean;
  start?: React.ReactNode;
  end?: React.ReactNode;
}

export interface IButtonProps
  extends IBoxProps,
    IComponentThemeProps<IButtonThemeFactory>,
    IPaperOwnProps,
    IButtonOwnProps {}

export type IButtonFactory = IPolymorphicComponentFactory<{
  props: IButtonProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof buttonTheme;
  variant: IButtonVariant | false;
}>;

import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IStylesProps } from '~/utils/styles/useComponentTheme';
import type { IPaperOwnProps } from '../Paper';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { buttonTheme, IButtonThemeFactory } from './Button.css';

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
    IStylesProps<IButtonThemeFactory>,
    IButtonBaseOwnProps,
    IButtonOwnProps {}

export type IButtonFactory = IPolymorphicComponentFactory<{
  props: IButtonProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof buttonTheme;
}>;

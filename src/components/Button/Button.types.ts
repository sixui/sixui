import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { buttonStyles, IButtonStylesFactory } from './Button.css';

export type IButtonOwnProps = {
  icon?: React.ReactNode;
  trailingIcon?: boolean;
  loading?: boolean;
  loadingAnimation?: 'progressIndicator' | 'halfSpin' | 'none';
  loadingText?: string;
};

export interface IButtonProps
  extends IBoxProps,
    IStylesProps<IButtonStylesFactory>,
    IButtonBaseOwnProps,
    IButtonOwnProps {}

export type IButtonFactory = IPolymorphicComponentFactory<{
  props: IButtonProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  styles: typeof buttonStyles;
}>;

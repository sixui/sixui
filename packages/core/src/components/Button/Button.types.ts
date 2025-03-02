import type { IBoxProps } from '~/components/Box';
import type {
  IButtonBaseChildrenRenderPops,
  IButtonBaseOwnProps,
} from '~/components/ButtonBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { buttonTheme, IButtonThemeFactory } from './Button.css';
import { IOmit } from '~/utils/types';

export const buttonVariants = [
  'elevated',
  'filled',
  'filledTonal',
  'outlined',
  'text',
  'danger',
  'snackbar',
  'inline',
] as const;
export type IButtonVariant = (typeof buttonVariants)[number];

export interface IButtonChildrenRenderPops
  extends IButtonBaseChildrenRenderPops {
  renderContent: (children: React.ReactNode) => React.ReactNode;
}

export interface IButtonOwnProps
  extends IOmit<IButtonBaseOwnProps, 'children'> {
  children?:
    | React.ReactNode
    | ((props: IButtonChildrenRenderPops) => React.ReactNode);
  loading?: boolean;
  loadingAnimation?: 'progressIndicator' | 'halfSpin' | 'none';
  loadingText?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  hasStartSlot?: boolean;
  hasEndSlot?: boolean;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  animatedLeadingIconSlot?: boolean;
  animatedTrailingIconSlot?: boolean;
  loadingIndicatorPosition?: 'start' | 'label' | 'end';
}

export interface IButtonProps
  extends IBoxProps,
    IComponentThemeProps<IButtonThemeFactory>,
    IButtonOwnProps {}

export type IButtonFactory = IPolymorphicComponentFactory<{
  props: IButtonProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof buttonTheme;
  variant: IButtonVariant | false;
}>;

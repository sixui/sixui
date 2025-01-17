import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  IButtonBaseChildrenRendererPops,
  IButtonBaseOwnProps,
} from '../ButtonBase';
import type { IPaperOwnProps } from '../Paper';
import type { buttonTheme, IButtonThemeFactory } from './Button.css';
import { IOmit } from '~/helpers/types';

export type IButtonVariant =
  | 'elevated'
  | 'filled'
  | 'filledTonal'
  | 'outlined'
  | 'text'
  | 'danger'
  | 'snackbar'
  | 'inline';

export interface IButtonChildrenRendererPops
  extends IButtonBaseChildrenRendererPops {
  renderContent: (children: React.ReactNode) => React.ReactNode;
}

export interface IButtonOwnProps
  extends IOmit<IButtonBaseOwnProps, 'children'> {
  children?:
    | React.ReactNode
    | ((props: IButtonChildrenRendererPops) => React.ReactNode);
  loading?: boolean;
  loadingAnimation?: 'progressIndicator' | 'halfSpin' | 'none';
  loadingText?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  hasLeading?: boolean;
  hasTrailing?: boolean;
  start?: React.ReactNode;
  end?: React.ReactNode;
  // FIXME: animated slots
  animatedSlots?: boolean;
}

export interface IButtonProps
  extends IBoxProps,
    IComponentThemeProps<IButtonThemeFactory>,
    IOmit<IPaperOwnProps, 'children'>,
    IButtonOwnProps {}

export type IButtonFactory = IPolymorphicComponentFactory<{
  props: IButtonProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof buttonTheme;
  variant: IButtonVariant | false;
}>;

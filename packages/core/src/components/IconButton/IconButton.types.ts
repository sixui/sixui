import type { IBoxProps } from '~/components/Box';
import type { IButtonOwnProps } from '~/components/Button';
import type { IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  iconButtonTheme,
  IIconButtonThemeFactory,
} from './IconButton.css';

export type IIconButtonVariant =
  | 'standard'
  | 'filled'
  | 'filledTonal'
  | 'outlined'
  | 'danger'
  | 'snackbar';

export interface IIconButtonOwnProps
  extends IOmit<
    IButtonOwnProps,
    'startSlot' | 'endSlot' | 'leadingIcon' | 'trailingIcon' | 'loadingText'
  > {
  toggle?: boolean;
  selected?: boolean;
  icon: React.ReactNode;
  selectedIcon?: React.ReactNode;
}

export interface IIconButtonProps
  extends IBoxProps,
    IComponentThemeProps<IIconButtonThemeFactory>,
    IIconButtonOwnProps {}

export type IIconButtonFactory = IPolymorphicComponentFactory<{
  props: IIconButtonProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof iconButtonTheme;
  variant: IIconButtonVariant;
}>;

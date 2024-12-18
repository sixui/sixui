import type { IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonOwnProps } from '../Button';
import type { fabTheme, IFabThemeFactory } from './Fab.css';

export type IFabVariant =
  | 'surface'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'branded';

export interface IFabOwnProps
  extends IOmit<IButtonOwnProps, 'leadingIcon' | 'trailingIcon'> {
  lowered?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface IFabProps
  extends IBoxProps,
    IComponentThemeProps<IFabThemeFactory>,
    IFabOwnProps {}

export type IFabFactory = IPolymorphicComponentFactory<{
  props: IFabProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof fabTheme;
  variant: IFabVariant;
}>;

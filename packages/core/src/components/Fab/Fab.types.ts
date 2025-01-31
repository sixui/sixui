import type { IBoxProps } from '~/components/Box';
import type { IButtonOwnProps } from '~/components/Button';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IOmit } from '~/utils/types';
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

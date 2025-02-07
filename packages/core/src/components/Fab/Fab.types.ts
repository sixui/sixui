import type { IBoxProps } from '~/components/Box';
import type { IButtonOwnProps } from '~/components/Button';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IOmit } from '~/utils/types';
import type { fabTheme, IFabThemeFactory } from './Fab.css';

export const fabVariants = [
  'surface',
  'primary',
  'secondary',
  'tertiary',
  'branded',
] as const;
export type IFabVariant = (typeof fabVariants)[number];

export const fabSizes = ['sm', 'md', 'lg'] as const;
export type IFabSize = (typeof fabSizes)[number];

export interface IFabOwnProps
  extends IOmit<IButtonOwnProps, 'leadingIcon' | 'trailingIcon'> {
  flat?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  size?: IFabSize;
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

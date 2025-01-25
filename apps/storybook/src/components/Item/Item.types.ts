import type { IBoxProps } from '~/components/Box';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IItemThemeFactory, itemTheme } from './Item.css';

export type IItemVariant = 'primary';

export interface IItemOwnProps {
  start?: React.ReactNode;
  overline?: React.ReactNode;
  children?: React.ReactNode;
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  end?: React.ReactNode;
  lineClamp?: number;
}

export interface IItemProps
  extends IBoxProps,
    IComponentThemeProps<IItemThemeFactory>,
    IItemOwnProps,
    IItemOwnProps {}

export type IItemFactory = IPolymorphicComponentFactory<{
  props: IItemProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof itemTheme;
  variant: IItemVariant | false;
}>;

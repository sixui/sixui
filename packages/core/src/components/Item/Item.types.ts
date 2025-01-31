import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IItemThemeFactory, itemTheme } from './Item.css';

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
    IItemOwnProps {}

export type IItemFactory = IPolymorphicComponentFactory<{
  props: IItemProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof itemTheme;
}>;

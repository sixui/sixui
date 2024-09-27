import type { IBoxProps } from '~/components/Box';
import type { IListOwnProps } from '~/components/List';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IMenuListThemeFactory, menuListTheme } from './MenuList.css';

export type IMenuListOwnProps = IListOwnProps;

export interface IMenuListProps
  extends IBoxProps,
    IComponentThemeProps<IMenuListThemeFactory>,
    IMenuListOwnProps {}

export type IMenuListFactory = IPolymorphicComponentFactory<{
  props: IMenuListProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof menuListTheme;
}>;

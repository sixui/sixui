import type { IBoxProps } from '~/components/Box';
import type { IListOwnProps } from '~/components/List';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
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

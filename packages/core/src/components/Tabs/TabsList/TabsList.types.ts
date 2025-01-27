import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { ITabsListThemeFactory, tabsListTheme } from './TabsList.css';

export interface ITabsListOwnProps {
  children?: React.ReactNode;
}

export interface ITabsListProps
  extends IBoxProps,
    IComponentThemeProps<ITabsListThemeFactory>,
    ITabsListOwnProps {}

export type ITabsListFactory = IComponentFactory<{
  props: ITabsListProps;
  ref: HTMLDivElement;
  theme: typeof tabsListTheme;
}>;

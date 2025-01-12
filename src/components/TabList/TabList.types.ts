import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ITabListThemeFactory, tabListTheme } from './TabList.css';

export interface ITabListOwnProps {
  children?: React.ReactNode;
}

export interface ITabListProps
  extends IBoxProps,
    IComponentThemeProps<ITabListThemeFactory>,
    ITabListOwnProps {}

export type ITabListFactory = IComponentFactory<{
  props: ITabListProps;
  ref: HTMLDivElement;
  theme: typeof tabListTheme;
}>;

import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { NavigationRailDestination } from '../NavigationRailDestination';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type {
  INavigationRailThemeFactory,
  navigationRailTheme,
} from './NavigationRail.css';

export interface INavigationRailOwnProps extends IPaperBaseOwnProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  justify?: 'start' | 'center' | 'end';
  divider?: boolean;
}

export interface INavigationRailProps
  extends IBoxProps,
    IComponentThemeProps<INavigationRailThemeFactory>,
    INavigationRailOwnProps {}

export type INavigationRailFactory = IComponentFactory<{
  props: INavigationRailProps;
  ref: HTMLDivElement;
  theme: typeof navigationRailTheme;
  staticComponents: {
    Destination: typeof NavigationRailDestination;
  };
}>;

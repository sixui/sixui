import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { INavigationRailContentOwnProps } from '../NavigationRailContent';
import type {
  INavigationRailThemeFactory,
  navigationRailTheme,
} from './NavigationRail.css';
import { NavigationRailDestination } from '../NavigationRailDestination';

export interface INavigationRailOwnProps
  extends INavigationRailContentOwnProps {
  opened?: boolean;
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

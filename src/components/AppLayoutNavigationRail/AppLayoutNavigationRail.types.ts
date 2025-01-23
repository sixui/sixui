import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { INavigationRailContentOwnProps } from '../NavigationRailContent';
import type { NavigationRailDestination } from '../NavigationRailDestination';
import type {
  appLayoutNavigationRailTheme,
  IAppLayoutNavigationRailThemeFactory,
} from './AppLayoutNavigationRail.css';

export interface IAppLayoutNavigationRailOwnProps
  extends INavigationRailContentOwnProps {
  hasHeader?: boolean;
  opened?: boolean;
}

export interface IAppLayoutNavigationRailProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutNavigationRailThemeFactory>,
    IAppLayoutNavigationRailOwnProps {}

export type IAppLayoutNavigationRailFactory = IComponentFactory<{
  props: IAppLayoutNavigationRailProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutNavigationRailTheme;
  staticComponents: {
    Destination: typeof NavigationRailDestination;
  };
}>;

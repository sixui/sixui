import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { INavigationRailOwnProps } from '../NavigationRail';
import type {
  appLayoutNavigationRailTheme,
  IAppLayoutNavigationRailThemeFactory,
} from './AppLayoutNavigationRail.css';
import { NavigationRailDestination } from '../NavigationRailDestination';

export interface IAppLayoutNavigationRailOwnProps
  extends INavigationRailOwnProps {
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

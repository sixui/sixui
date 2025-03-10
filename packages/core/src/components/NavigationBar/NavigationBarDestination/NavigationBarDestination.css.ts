import type { INavigationRailDestinationThemeFactory } from '~/components/NavigationRail/NavigationRailDestination/NavigationRailDestination.css';
import { navigationRailDestinationTheme } from '~/components/NavigationRail/NavigationRailDestination/NavigationRailDestination.css';

export type INavigationBarDestinationThemeFactory =
  INavigationRailDestinationThemeFactory;

export const navigationBarDestinationTheme = navigationRailDestinationTheme;

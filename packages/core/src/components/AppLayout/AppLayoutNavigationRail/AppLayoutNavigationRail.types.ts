import type { IBoxProps } from '~/components/Box';
import type { INavigationRailOwnProps } from '~/components/NavigationRail';
import type { NavigationRailDestination } from '~/components/NavigationRail/NavigationRailDestination';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  appLayoutNavigationRailTheme,
  IAppLayoutNavigationRailThemeFactory,
} from './AppLayoutNavigationRail.css';

export interface IAppLayoutNavigationRailOwnProps
  extends INavigationRailOwnProps {
  hasTopBar?: boolean;
  hasNavigationDrawer?: boolean;
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

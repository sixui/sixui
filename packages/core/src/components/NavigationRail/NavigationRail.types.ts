import type { IBoxProps } from '~/components/Box';
import type { IStandardAsideOwnProps } from '~/components/StandardAside';
import type { IHorizontalSide, IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  INavigationRailThemeFactory,
  navigationRailTheme,
} from './NavigationRail.css';
import type { INavigationRailContentOwnProps } from './NavigationRailContent';
import type { NavigationRailDestination } from './NavigationRailDestination';

export interface INavigationRailOwnProps
  extends IOmit<IStandardAsideOwnProps, 'children'>,
    INavigationRailContentOwnProps {
  side?: IHorizontalSide;
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

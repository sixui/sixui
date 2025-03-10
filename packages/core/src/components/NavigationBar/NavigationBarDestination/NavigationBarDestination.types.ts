import type { IBoxProps } from '~/components/Box';
import type { INavigationRailDestinationOwnProps } from '~/components/NavigationRail/NavigationRailDestination';
import type {
  INavigationRailDestinationThemeFactory,
  navigationRailDestinationTheme,
} from '~/components/NavigationRail/NavigationRailDestination/NavigationRailDestination.css';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';

export type INavigationBarDestinationOwnProps =
  INavigationRailDestinationOwnProps;

export interface INavigationBarDestinationProps
  extends IBoxProps,
    IComponentThemeProps<INavigationRailDestinationThemeFactory>,
    INavigationBarDestinationOwnProps {}

export type INavigationBarDestinationFactory = IPolymorphicComponentFactory<{
  props: INavigationBarDestinationProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof navigationRailDestinationTheme;
}>;

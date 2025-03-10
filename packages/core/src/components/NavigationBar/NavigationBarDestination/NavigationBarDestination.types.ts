import type { IBoxProps } from '~/components/Box';
import type { INavigationRailDestinationOwnProps } from '~/components/NavigationRail/NavigationRailDestination';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type {
  INavigationBarDestinationThemeFactory,
  navigationBarDestinationTheme,
} from './NavigationBarDestination.css';

export type INavigationBarDestinationOwnProps =
  INavigationRailDestinationOwnProps;

export interface INavigationBarDestinationProps
  extends IBoxProps,
    IComponentThemeProps<INavigationBarDestinationThemeFactory>,
    INavigationBarDestinationOwnProps {}

export type INavigationBarDestinationFactory = IPolymorphicComponentFactory<{
  props: INavigationBarDestinationProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof navigationBarDestinationTheme;
}>;

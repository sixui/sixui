import type { IBoxProps } from '~/components/Box';
import type { IButtonBaseOwnProps } from '~/components/ButtonBase';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IOmit } from '~/utils/types';
import type {
  INavigationRailDestinationThemeFactory,
  navigationRailDestinationTheme,
} from './NavigationRailDestination.css';

export interface INavigationRailDestinationOwnProps
  extends IOmit<IButtonBaseOwnProps, 'children'> {
  label?: React.ReactNode;
  active?: boolean;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  loading?: boolean;
  badge?: React.ReactNode;
}

export interface INavigationRailDestinationProps
  extends IBoxProps,
    IComponentThemeProps<INavigationRailDestinationThemeFactory>,
    INavigationRailDestinationOwnProps {}

export type INavigationRailDestinationFactory = IPolymorphicComponentFactory<{
  props: INavigationRailDestinationProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof navigationRailDestinationTheme;
}>;

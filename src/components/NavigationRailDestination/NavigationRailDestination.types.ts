import type { IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type {
  INavigationRailDestinationThemeFactory,
  navigationRailDestinationTheme,
} from './NavigationRailDestination.css';

export interface INavigationRailDestinationOwnProps
  extends IOmit<IButtonBaseOwnProps, 'children'> {
  label?: React.ReactNode;

  /** Whether or not the tab is selected. **/
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

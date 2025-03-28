import type { IBoxProps } from '~/components/Box';
import type { IListItemOwnProps } from '~/components/List';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type {
  INavigationDrawerDestinationThemeFactory,
  navigationDrawerDestinationTheme,
} from './NavigationDrawerDestination.css';
import { IOmit } from '~/utils/types';

export interface INavigationDrawerDestinationOwnProps
  extends IOmit<IListItemOwnProps, 'selected' | 'trailingSupportingText'> {
  active?: boolean;
  activeLeadingIcon?: React.ReactNode;
  activeTrailingIcon?: React.ReactNode;
  badgeLabel?: React.ReactNode;
}

export interface INavigationDrawerDestinationProps
  extends IBoxProps,
    IComponentThemeProps<INavigationDrawerDestinationThemeFactory>,
    INavigationDrawerDestinationOwnProps {}

export type INavigationDrawerDestinationFactory = IPolymorphicComponentFactory<{
  props: INavigationDrawerDestinationProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof navigationDrawerDestinationTheme;
}>;

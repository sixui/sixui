import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IListItemOwnProps } from '../ListItem';
import type {
  INavigationDrawerDestinationThemeFactory,
  navigationDrawerDestinationTheme,
} from './NavigationDrawerDestination.css';
import { IOmit } from '~/helpers/types';

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

export type INavigationDrawerDestinationFactory = IComponentFactory<{
  props: INavigationDrawerDestinationProps;
  ref: HTMLDivElement;
  theme: typeof navigationDrawerDestinationTheme;
}>;

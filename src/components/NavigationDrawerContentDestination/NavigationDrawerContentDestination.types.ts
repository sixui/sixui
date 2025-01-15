import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  INavigationDrawerContentDestinationThemeFactory,
  navigationDrawerContentDestinationTheme,
} from './NavigationDrawerContentDestination.css';

export interface INavigationDrawerContentDestinationOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface INavigationDrawerContentDestinationProps
  extends IBoxProps,
    IComponentThemeProps<INavigationDrawerContentDestinationThemeFactory>,
    INavigationDrawerContentDestinationOwnProps {}

export type INavigationDrawerContentDestinationFactory = IComponentFactory<{
  props: INavigationDrawerContentDestinationProps;
  ref: HTMLDivElement;
  theme: typeof navigationDrawerContentDestinationTheme;
}>;

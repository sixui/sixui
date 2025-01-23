import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import type { NavigationDrawerSection } from '../NavigationDrawerSection';
import type {
  INavigationDrawerThemeFactory,
  navigationDrawerTheme,
} from './NavigationDrawer.css';
import { IOmit } from '~/helpers/types';
import { ISideSheetOwnProps } from '../SideSheet';
import { IStandardAsideOwnProps } from '../StandardAside';

export interface INavigationRailOwnProps
  extends IOmit<IStandardAsideOwnProps, 'children'>,
    ISideSheetOwnProps {}

export interface INavigationRailProps
  extends IBoxProps,
    IComponentThemeProps<INavigationRailThemeFactory>,
    INavigationRailOwnProps {}

export type INavigationDrawerFactory = IComponentFactory<{
  props: INavigationDrawerProps;
  ref: HTMLDivElement;
  theme: typeof navigationDrawerTheme;
  staticComponents: {
    Section: typeof NavigationDrawerSection;
    Destination: typeof NavigationDrawerDestination;
  };
}>;

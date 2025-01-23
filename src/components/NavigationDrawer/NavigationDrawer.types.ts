import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IAsideOwnProps } from '../Aside';
import type { IBoxProps } from '../Box';
import type { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import type { NavigationDrawerSection } from '../NavigationDrawerSection';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type {
  INavigationDrawerThemeFactory,
  navigationDrawerTheme,
} from './NavigationDrawer.css';

export interface INavigationDrawerOwnProps
  extends IOmit<IAsideOwnProps, 'children'>,
    ISideSheetContentOwnProps {}

export interface INavigationDrawerProps
  extends IBoxProps,
    IComponentThemeProps<INavigationDrawerThemeFactory>,
    INavigationDrawerOwnProps {}

export type INavigationDrawerFactory = IComponentFactory<{
  props: INavigationDrawerProps;
  ref: HTMLDivElement;
  theme: typeof navigationDrawerTheme;
  staticComponents: {
    Section: typeof NavigationDrawerSection;
    Destination: typeof NavigationDrawerDestination;
  };
}>;

import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import type { NavigationDrawerSection } from '../NavigationDrawerSection';
import type {
  INavigationDrawerThemeFactory,
  navigationDrawerTheme,
} from './NavigationDrawer.css';
import { ISideSheetOwnProps } from '../SideSheet';

export type INavigationDrawerOwnProps = ISideSheetOwnProps;

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

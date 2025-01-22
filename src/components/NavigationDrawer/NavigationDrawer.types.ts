import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { INavigationDrawerContentOwnProps } from '../NavigationDrawerContent';
import type { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import type { NavigationDrawerSection } from '../NavigationDrawerSection';
import type {
  INavigationDrawerThemeFactory,
  navigationDrawerTheme,
} from './NavigationDrawer.css';

export interface INavigationDrawerOwnProps
  extends INavigationDrawerContentOwnProps {
  detached?: boolean;
  standardOpened?: boolean;
  modalOpened?: boolean;
}

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

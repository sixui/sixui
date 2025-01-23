import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { INavigationDrawerOwnProps } from '../NavigationDrawer';
import type { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import type {
  appLayoutNavigationDrawerTheme,
  IAppLayoutNavigationDrawerThemeFactory,
} from './AppLayoutNavigationDrawer.css';

export interface IAppLayoutNavigationDrawerOwnProps
  extends INavigationDrawerOwnProps {
  hasHeader?: boolean;
}

export interface IAppLayoutNavigationDrawerProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutNavigationDrawerThemeFactory>,
    IAppLayoutNavigationDrawerOwnProps {}

export type IAppLayoutNavigationDrawerFactory = IComponentFactory<{
  props: IAppLayoutNavigationDrawerProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutNavigationDrawerTheme;
  staticComponents: {
    Destination: typeof NavigationDrawerDestination;
  };
}>;

import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import type { NavigationDrawerSection } from '../NavigationDrawerSection';
import type {
  appLayoutNavigationDrawerTheme,
  IAppLayoutNavigationDrawerThemeFactory,
} from './AppLayoutNavigationDrawer.css';
import { ISideSheetOwnProps } from '../SideSheet';

export interface IAppLayoutNavigationDrawerOwnProps extends ISideSheetOwnProps {
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
    Section: typeof NavigationDrawerSection;
    Destination: typeof NavigationDrawerDestination;
  };
}>;

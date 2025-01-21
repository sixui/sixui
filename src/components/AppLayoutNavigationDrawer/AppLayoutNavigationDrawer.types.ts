import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { INavigationDrawerContentOwnProps } from '../NavigationDrawerContent';
import type { NavigationDrawerSection } from '../NavigationDrawerSection';
import type {
  appLayoutNavigationDrawerTheme,
  IAppLayoutNavigationDrawerThemeFactory,
} from './AppLayoutNavigationDrawer.css';

export interface IAppLayoutNavigationDrawerOwnProps
  extends INavigationDrawerContentOwnProps {
  detached?: boolean;
  standardOpened?: boolean;
  modalOpened?: boolean;
}

export interface IAppLayoutNavigationDrawerProps
  extends IOmit<IBoxProps, 'children'>,
    IComponentThemeProps<IAppLayoutNavigationDrawerThemeFactory>,
    IAppLayoutNavigationDrawerOwnProps {}

export type IAppLayoutNavigationDrawerFactory = IComponentFactory<{
  props: IAppLayoutNavigationDrawerProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutNavigationDrawerTheme;
  staticComponents: {
    Section: typeof NavigationDrawerSection;
  };
}>;

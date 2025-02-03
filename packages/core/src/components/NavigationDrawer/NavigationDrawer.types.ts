import type { IBoxProps } from '~/components/Box';
import type { ISideSheetOwnProps } from '~/components/SideSheet';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component';
import type {
  INavigationDrawerThemeFactory,
  navigationDrawerTheme,
} from './NavigationDrawer.css';
import type { NavigationDrawerDestination } from './NavigationDrawerDestination';
import type { NavigationDrawerSection } from './NavigationDrawerSection';

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

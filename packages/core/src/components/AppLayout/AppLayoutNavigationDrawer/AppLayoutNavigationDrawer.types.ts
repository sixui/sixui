import type { IBoxProps } from '~/components/Box';
import type {
  NavigationDrawerDestination,
  NavigationDrawerSection,
} from '~/components/NavigationDrawer';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  appLayoutNavigationDrawerTheme,
  IAppLayoutNavigationDrawerThemeFactory,
} from './AppLayoutNavigationDrawer.css';
import { ISideSheetOwnProps } from '~/components/SideSheet';

export type IAppLayoutNavigationDrawerOwnProps = ISideSheetOwnProps;

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
